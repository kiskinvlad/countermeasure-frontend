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
import { AppState, selectScenarioState, selectDisputesState } from '@app/shared/ngrx-store/app.states';
import { ActivatedRoute } from '@angular/router';
import { FetchSceneries } from '@app/shared/ngrx-store/actions/scenario.actions';
import { FetchDisputesByCase } from '@app/shared/ngrx-store/actions/disputes.actions';
import * as Chart from 'chart.js';
import * as jsPDF from 'jspdf';
import 'chart.piecelabel.js';

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
 * @param {string | null} errorMessage Error message param
 * @param {Subscription} subscription Subscription param
 * @param {number} case_id Current case id param
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
  private errorMessage: string | null;
  private subscription: Subscription;
  private case_id: number;
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
        this.scenarios = (state.sceneries || []).map((scenario, index) => {
          scenario.savings = +scenario.taxes + +scenario.penalties + +scenario.interest;
          scenario['total_tax_percents'] = Math.round((scenario.taxes / this.disputes_total['tax']) * 100);
          scenario['total_penalties_percents'] = Math.round((scenario.penalties / this.disputes_total['penalties']) * 100);
          scenario['total_interest_percents'] = Math.round((scenario.interest / this.disputes_total['interest']) * 100);
          scenario['total_savings_percents'] = Math.round((scenario.savings / this.disputes_total['total']) * 100);
          scenario['total_other_amounts_percents'] = Math.round(
            ((this.disputes_total['total'] - scenario.savings) / this.disputes_total['total']) * 100
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

    const payload = {
      case_id: this.case_id
    };

    this.store.dispatch(new FetchSceneries(payload));
    this.store.dispatch(new FetchDisputesByCase({case_id: this.case_id}));
  }
/**
 * Sort scenarios by param method
 * @param {Array<any>} array Array to sort
 * @param {string} param Param for sort
 * @returns {Array<any>}
 */
  private sortBySavings(array: Array<any>, x): Array<any> {
    return array.sort((a, b) => b[x] - a[x]);
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
                return label + ' : ' + parseFloat(data_labels.datasets[0].data[tooltipItem.index]).toFixed(2) + ' $';
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
    let yOffset = 150;
    this.canvas.toArray().forEach((el) => {
     imgData.push(el.nativeElement.toDataURL('image/png'));
    });
    const doc = new jsPDF('p', 'pt', 'a4', true);
    doc.line(50, 25, 550, 25);
    doc.fromHTML(header, 100, 35);
    doc.line(50, 115, 550, 115);
    for (let i = 0; i < this.scenarios.length; i++) {
      doc.fromHTML('Scenario ' + (i + 1), 50, yOffset, {'pagesplit': true});
      doc.fromHTML('Tax', 50, yOffset + 25, {'pagesplit': true});
      doc.fromHTML(this.scenarios[i].total_tax_percents + '%', 280, yOffset + 25, {'pagesplit': true});
      doc.fromHTML('Penalties', 50, yOffset + 40, {'pagesplit': true});
      doc.fromHTML(this.scenarios[i].total_penalties_percents + '%', 280, yOffset + 40, {'pagesplit': true});
      doc.fromHTML('Interest', 50, yOffset + 55, {'pagesplit': true});
      doc.fromHTML(this.scenarios[i].total_interest_percents + '%', 280, yOffset + 55, {'pagesplit': true});

      doc.fromHTML('Total Savings (' + this.scenarios[i].total_savings_percents + '%)', 50, yOffset + 95, {'pagesplit': true});
      doc.fromHTML('$' + this.scenarios[i].savings, 50, yOffset + 110, {'pagesplit': true});
      doc.fromHTML('Outstanding Amount (' + this.scenarios[i].total_other_amounts_percents + '%)', 50, yOffset + 130, {'pagesplit': true});
      doc.fromHTML('$' + this.scenarios[i].total_other_amounts, 50, yOffset + 145, {'pagesplit': true});

      doc.addImage(imgData[i], 'PNG', 300, yOffset, 320, 170, undefined, 'FAST', {'pagesplit': true});
      doc.line(50, yOffset + 185, 550, yOffset + 185);
      yOffset += 200;
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
    this.charts.forEach(chart => chart.destroy());
    this.subscription.unsubscribe();
  }

}
