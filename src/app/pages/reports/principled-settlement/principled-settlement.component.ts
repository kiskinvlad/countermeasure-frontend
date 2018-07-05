import {
   Component,
   OnInit,
   ViewChildren,
   QueryList,
   AfterViewInit,
   ChangeDetectorRef,
   OnDestroy,
   ViewChild,
   ElementRef
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, selectScenarioState, selectDisputesState, selectCasesState } from '@app/shared/ngrx-store/app.states';
import { ActivatedRoute } from '@angular/router';
import { FetchScenarios } from '@app/shared/ngrx-store/actions/scenario.actions';
import { FetchDisputesByCase } from '@app/shared/ngrx-store/actions/disputes.actions';
import * as Chart from 'chart.js';
import * as jsPDF from 'jspdf';
import 'chart.piecelabel.js';
import { GetCase } from '@app/shared/ngrx-store/actions/cases.actions';
import {UtilsService} from '@shared/utils.service';

@Component({
  selector: 'ct-principled-settlement',
  templateUrl: './principled-settlement.component.html',
  styleUrls: ['./principled-settlement.component.scss']
})
/**
 * Principled settlement component.
 * @implements {OnInit, OnDestroy, AfterViewInit}
 */
export class PrincipledSettlementComponent implements OnInit, OnDestroy, AfterViewInit {
/**
 * @param {ElementRef} header Pdf header element reference param
 * @param {ElementRef} canvas Pdf chart element reference param
 * @param {Chart[]} charts Charts array param
 * @param {any[]} ctx Canvas elements context param
 * @param {Array<any>} scenarios Scenarios array param
 * @param {Array<any>} disputes Taxes array param
 * @param {any} disputes_total Taxes count param
 * @param {Observable<any>} getState$ State observable param
 * @param {Observable<any>} getDisputesState$ Disputes state observable param
 * @param {Observable<any>} getCaseState$ Case state observable param
 * @param {string | null} errorMessage Error message param
 * @param {Subscription} subscription Subscription param
 * @param {number} case_id Current case id param
 * @param {string} case_name Current case name param
 * @param {string} matter_id Current case matter id param
 */
  @ViewChildren('canvas') canvas: QueryList<any>;
  @ViewChild('header') header: ElementRef;

  public charts: Chart[] = [];
  public ctxs: any[] = [];
  public scenarios: Array<any> = [];
  public disputes: Array<any> = [];
  private disputes_total: any = {};
  private getState$: Observable<any>;
  private getDisputesState$: Observable<any>;
  private getCaseState$: Observable<any>;
  private errorMessage: string | null;
  private subscription: Subscription;
  private case_id: number;
  private case_name: string;
  private matter_id: string;
/**
 * @constructor
 * @param {ActivatedRoute} route Current route state service
 * @param {Store<AppState>} store App state store service
 * @param {ChangeDetectorRef} cdr Change detector reference service
 */
  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    this.getState$ = this.store.select(selectScenarioState);
    this.getDisputesState$ = this.store.select(selectDisputesState);
    this.getCaseState$ = this.store.select(selectCasesState);
  }
/**
 * Initialize principled settlement component life cycle method
 */
  ngOnInit() {
    this.subscription = this.getState$.subscribe((state) => {
      this.errorMessage = state.errorMessage;
      this.subscription = this.getDisputesState$.subscribe((disputes_state) => {
        this.errorMessage = disputes_state.errorMessage;
        this.disputes_total['tax'] = 0;
        this.disputes_total['penalties'] = 0;
        this.disputes_total['interest'] = 0;
        this.disputes = (disputes_state.disputes || []).map(item => {
          this.disputes_total['tax'] += +item.DIFF_net_federal_tax + +item.DIFF_net_provincial_tax;
          this.disputes_total['penalties'] += +item.DIFF_gross_negligence_penalty + +item.DIFF_late_filing_penalty
            + +item.DIFF_other_penalties + +item.DIFF_total_penalties;
          this.disputes_total['interest'] += +item.DIFF_estimated_interest;
          this.disputes_total['total'] = this.disputes_total['tax'] + this.disputes_total['penalties'] + this.disputes_total['interest'];
          return {...item };
        });
        this.scenarios = (state.scenarios || []).map((scenario, index) => {
          scenario.savings = +scenario.taxes + +scenario.penalties + +scenario.interest;
          scenario['total_tax_percents'] = Math.round(Math.abs(scenario.taxes / this.disputes_total['tax']) * 100);
          scenario['total_penalties_percents'] = Math.round(Math.abs(scenario.penalties / this.disputes_total['penalties']) * 100);
          scenario['total_interest_percents'] = Math.round(Math.abs(scenario.interest / this.disputes_total['interest']) * 100);
          scenario['total_savings_percents'] = Math.round(Math.abs(scenario.savings / this.disputes_total['total']) * 100);
          scenario['total_other_amounts_percents'] = Math.round(
            Math.abs((this.disputes_total['total'] - scenario.savings) / this.disputes_total['total']) * 100
          );
          scenario['total_other_amounts'] = this.disputes_total['total'] - scenario.savings;
          return {...scenario };
        });
        this.scenarios = this.sortBySavings(this.scenarios, 'savings');
      });
    });

    this.subscription = this.route.params.subscribe(params => {
      this.case_id = +params['case_id'];
    });

    this.subscription = this.getCaseState$.subscribe((case_state) => {
      this.errorMessage = case_state.errorMessage;
      this.case_name = case_state.name;
      this.matter_id = case_state.matter_id;
    });

    const payload = {
      case_id: this.case_id
    };

    this.store.dispatch(new FetchScenarios(payload));
    this.store.dispatch(new FetchDisputesByCase({case_id: this.case_id}));
    this.store.dispatch(new GetCase({case_id: this.case_id}));
  }
/**
 * Sort scenarios by param method
 * @param {Array<any>} array Array to sort
 * @param {string} param Param for sort
 * @returns {Array<any>}
 */
  private sortBySavings(array: Array<any>, x): Array<any> {
    return array.sort((a, b) => a[x] - b[x]);
  }
/**
 * Create chart method
 * @param {any} data Data for chart
 * @param {number} index Scenario index
 * @param {any} ctx Canvas context
 */
  private createChart(data: any, index: number, ctx: any): void {
    const labels = [];
    const values = [];
    values.push(data.total_other_amounts);
    values.push(data.savings);
    labels.push('Outstanding');
    labels.push('Win');
    this.charts.push(new Chart(ctx.nativeElement.getContext('2d'), {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            backgroundColor: ['#699bc5', '#082948'],
            data: values,
            borderWidth: 0,
            datalabels: {
              display: true,
              formatter: function(value, context) {
                return null;
              }
            }
          }
        ]
      },
       options: {
        tooltips: {
          callbacks: {
             label: function(tooltipItem, data_labels) {
                const label = data_labels.labels[tooltipItem.index];
                return label + ' ' + UtilsService.currencyForLocale(parseFloat(data_labels.datasets[0].data[tooltipItem.index]));
             },
             title: function() {
              return false;
            },
          }
       },
       legend: {
        display: false
      },
        pieceLabel: {
          render: function (args) {
            if (args.label === 'Win') {
              return 'Win ' + args.percentage + '%';
            } else if (args.label === 'Outstanding' && args.percentage === 100) {
              return 'Win 0%';
            } else {
              return '';
            }
          },
          fontColor: '#fff',
          fontSize: 16,
          position: 'default',
          segment: true,
          outsidePadding: 4,
          overlap: true
        },
        plugins: {
          legend: false,
          outlabels: {
              text: null
          }
        }
      }
    }));
  }
/**
 * Create and download pdf method
 */
  public downloadPdf(): void {
    const header = this.header.nativeElement;
    const imgData = [];

    let height;
    let yOffset = 150;
    this.canvas.toArray().forEach((el) => {
     imgData.push(el.nativeElement.toDataURL('image/png'));
    });
    const doc = new jsPDF('p', 'pt', 'letter', true);

    doc.setDrawColor(0, 40, 63);
    doc.line(125, 25, 550, 25);
    doc.setFontSize(30);
    doc.setTextColor('105', '155', '197');
    doc.text(125, 70, 'Principled Settlement Report');
    doc.setFontType('normal');
    doc.setTextColor('0', '0', '0');
    doc.setFontSize(12);

    doc.line(25, 25, 110, 25);
    doc.setTextColor('105', '155', '197');
    height = doc.getTextDimensions(this.case_name).h * doc.splitTextToSize(this.case_name, 100).length;
    doc.text(25, 45, doc.splitTextToSize(this.case_name, 100));
    doc.text(25, 45 + height + 8, doc.splitTextToSize('Matter ID: ' + this.matter_id, 100));
    height += doc.getTextDimensions(doc.splitTextToSize('Matter ID: ' + this.matter_id, 100)).h;
    doc.text(25, 45 + height + 17, doc.splitTextToSize(UtilsService.dateForReports(), 100));
    doc.line(25, 57 + height + 15, 110, 57 + height + 15);
    doc.line(125, 57 + height + 15, 550, 57 + height + 15);

    for (let i = 0; i < this.scenarios.length; i++) {
      doc.setFontSize(12);
      doc.setFontType('bold');
      doc.setTextColor('105', '155', '197');
      doc.text(125, yOffset, 'Scenario ' + (i + 1), {'pagesplit': true});
      doc.setFontType('normal');
      doc.setTextColor('0', '0', '0');
      doc.text(125, yOffset + 25, 'Tax', {'pagesplit': true});
      doc.text(280, yOffset + 25, this.scenarios[i].total_tax_percents + '%', {'pagesplit': true});
      doc.text(125, yOffset + 43, 'Penalties', {'pagesplit': true});
      doc.text(280, yOffset + 43, this.scenarios[i].total_penalties_percents + '%', {'pagesplit': true});
      doc.text(125, yOffset + 61, 'Interest', {'pagesplit': true});
      doc.text(280, yOffset + 61, this.scenarios[i].total_interest_percents + '%', {'pagesplit': true});
      doc.setFontType('bold');
      doc.setTextColor('105', '155', '197');
      doc.text(125, yOffset + 95, 'Total Savings (' + this.scenarios[i].total_savings_percents + '%)', {'pagesplit': true});
      doc.setFontType('normal');
      doc.setTextColor('0', '0', '0');
      doc.text(125, yOffset + 113, (+this.scenarios[i].savings !== 0 ? UtilsService.currencyForLocale(this.scenarios[i].savings) : '$ - '),
        {'pagesplit': true}
      );
      doc.setFontType('bold');
      doc.setTextColor('105', '155', '197');
      doc.text(125, yOffset + 135, 'Outstanding Amount (' + this.scenarios[i].total_other_amounts_percents + '%)', {'pagesplit': true});
      doc.setFontType('normal');
      doc.setTextColor('0', '0', '0');
      doc.text(125, yOffset + 153, (+this.scenarios[i].total_other_amounts !== 0
        ? UtilsService.currencyForLocale(this.scenarios[i].total_other_amounts) : '$ - '),
          {'pagesplit': true}
      );

      doc.addImage(imgData[i], 'PNG', 300, yOffset - 10, 320, 170, undefined, 'FAST', {'pagesplit': true});
      if (this.scenarios.length - 1 !== i) {
        doc.line(125, yOffset + 185, 550, yOffset + 185);
      }
      yOffset += 215;
      if (yOffset > 600) {
        doc.addPage();
        yOffset = 50;
      }
    }
    window.open(URL.createObjectURL(doc.output('blob')));
    // doc.save('case_' + this.case_id + '_amount_in_dispute.pdf');
  }
/**
 * After view inititalize principled settlement component life cycle method
 */
  ngAfterViewInit(): void {
    this.subscription = this.canvas.changes.subscribe(() => {
      this.canvas.toArray().forEach((el, index) => {
        if (this.scenarios[index].total_other_amounts) {
          this.createChart(this.scenarios[index], index, el);
          this.cdr.detectChanges();
        }
      });
    });
  }
/**
 * Destroy principled settlement component life cycle method
 */
  ngOnDestroy(): void {
    if (this.charts.length > 0) {
      this.charts.forEach(chart => chart.destroy());
    }
    this.subscription.unsubscribe();
  }

}
