import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, selectDisputesState, selectCasesState } from '@app/shared/ngrx-store/app.states';
import { ActivatedRoute } from '@angular/router';
import { FetchDisputesByCase } from '@app/shared/ngrx-store/actions/disputes.actions';
import * as Chart from 'chart.js';
import * as jsPDF from 'jspdf';
import 'chart.piecelabel.js';
import 'jspdf-autotable';
import 'chartjs-plugin-piechart-outlabels';
import { ARIA_LIVE_DELAY_TYPE } from '@ng-bootstrap/ng-bootstrap/util/accessibility/live';
import { GetCase } from '@app/shared/ngrx-store/actions/cases.actions';
import {UtilsService} from '@shared/utils.service';

@Component({
  selector: 'ct-amount-in-dispute',
  templateUrl: './amount-in-dispute.component.html',
  styleUrls: ['./amount-in-dispute.component.scss']
})
/**
 * Amount in dispute component.
 * @implements {OnInit, OnDestroy}
 */
export class AmountInDisputeComponent implements OnInit, OnDestroy {
/**
 * @param {ElementRef} pdf Pdf table element refernce param
 * @param {ElementRef} header Pdf header element reference param
 * @param {ElementRef} canvas Pdf chart element reference param
 * @param {Chart} chart Chart object param
 * @param {any} ctx Canvas element context param
 * @param {Array<any>} disputed Taxes array param
 * @param {object} total_disputed Total tax count param
 * @param {Observable<any>} getState$ State observable param
 * @param {Observable<any>} getCaseState$ Case state observable param
 * @param {string | null} errorMessage Error message param
 * @param {Subscription} subscription Subscription param
 * @param {number} case_id Current case id param
 * @param {string} case_name Current case name param
 * @param {string} matter_id Current case matter id param
 */
  @ViewChild('pdf') pdf: ElementRef;
  @ViewChild('header') header: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;

  public chart: Chart;
  public ctx: any;
  public disputed: Array<any> = [];
  public grouped_disputed: Array<any> = [];
  public total_disputed: object = {};
  private getState$: Observable<any>;
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
 */
  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
  ) {
    this.getState$ = this.store.select(selectDisputesState);
    this.getCaseState$ = this.store.select(selectCasesState);
  }
/**
 * Initialize amount in dispute component life cycle method
 */
  ngOnInit() {
    this.subscription = this.getState$.subscribe((state) => {
      this.errorMessage = state.errorMessage;
      this.disputed = (state.disputes || []).map(item => {
        return {...item };
      });
      this.grouped_disputed = this.groupBy(this.disputed, 'year');
      this.calculateTableData();
      if (this.total_disputed) {
        this.createChart(this.total_disputed);
      }
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
    this.store.dispatch(new FetchDisputesByCase(payload));
    this.store.dispatch(new GetCase({case_id: this.case_id}));
  }
/**
 * Group taxes by param method
 * @param {Array<any>} array Array to group
 * @param {string} param Param for group
 * @returns {any[]}
 */
  private groupBy(array: Array<any>, param: string): any[] {
    const group_to_values = array.reduce(function (obj, item) {
      obj[item[param]] = obj[item[param]] || [];
      obj[item[param]].push(item);
      return obj;
    }, {});

    const groups = Object.keys(group_to_values).map(function (key) {
      return {param: key, item: group_to_values[key]};
    });
    return groups;
  }
/**
 * Calculate data for table method
 */
  private calculateTableData(): void {
    this.total_disputed['taxes'] = 0;
    this.total_disputed['penalties'] = 0;
    this.total_disputed['interest'] = 0;
    this.total_disputed['total'] = 0;
    this.grouped_disputed.forEach((group) => {
      group.taxes = 0;
      group.penalties = 0;
      group.interest = 0;
      group.total = 0;
      group.item.forEach((disputed) => {
        group.taxes += +disputed.DIFF_net_federal_tax + +disputed.DIFF_net_provincial_tax;
        group.penalties += +disputed.DIFF_gross_negligence_penalty + +disputed.DIFF_late_filing_penalty + +disputed.DIFF_other_penalties;
        group.interest += +disputed.DIFF_estimated_interest;
      });
      group.total += group.taxes + group.penalties + group.interest;
      this.total_disputed['taxes'] += group.taxes;
      this.total_disputed['penalties'] += group.penalties;
      this.total_disputed['interest'] += group.interest;
      this.total_disputed['total'] += group.total;
    });
    this.total_disputed['taxes_percents'] = Math.round(this.total_disputed['taxes'] / this.total_disputed['total'] * 100) + '%';
    this.total_disputed['penalties_percents'] = Math.round(this.total_disputed['penalties'] / this.total_disputed['total'] * 100) + '%';
    this.total_disputed['interest_percents'] = Math.round(this.total_disputed['interest'] / this.total_disputed['total'] * 100) + '%';
  }
/**
 * Create chart method
 * @param {any} data Data for chart
 */
  private createChart(data: any): void {
    const data_set = [data.taxes, data.penalties, data.interest];
    const labels_set = ['Taxes', 'Penalties', 'Interest'];
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.chart = new Chart(this.ctx, {
      type: 'doughnut',
      data: {
        labels: labels_set,
        datasets: [
          {
            label: 'Total',
            backgroundColor: ['#082948', '#699bc5', '#c46158'],
            data: data_set,
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
        layout: {
         padding: {
           top: 65,
           bottom: 65
         },
        },
       tooltips: {
         callbacks: {
            label: function(tooltipItem, data_labels) {
               const label = data_labels.labels[tooltipItem.index];
               return label + ' : ' + UtilsService.currencyForLocale(parseFloat(data_labels.datasets[0].data[tooltipItem.index]));
            },
            title: function() {
             return false;
           },
         }
      },
       legend: {
         labels: {
           fontSize: 18
         }
       },
       plugins: {
         legend: false,
         outlabels: {
             text: function(chartData) {
               const index = chartData.dataIndex;
               const label = chartData.labels[index];
               const value = UtilsService.currencyForLocale(chartData.dataset.data[index]);
               const percents = (Math.abs(chartData.percent) * 100).toFixed(0) + '%';
               return label + ' (' + percents + ')' + '\n' + value;
             },
             color: '#082948',
             backgroundColor: '',
             stretch: 45,
             textAlign: 'left',
             font: {
              weight: 'bold',
              lineHeight: 1.5,
              resizable: true,
              minSize: 16,
              maxSize: 18
            }
         }
       }
      }
    });
  }
/**
 * Create and download pdf method
 */
  public downloadPdf(): void {
    const header = this.header.nativeElement;
    const content = this.pdf.nativeElement;
    const imgData = this.canvas.nativeElement.toDataURL('image/png');
    const yOffset = 150;
    let height;
    const doc = new jsPDF('p', 'pt', 'letter', true);

    doc.setDrawColor(0, 40, 63);
    doc.line(125, 25, 550, 25);
    doc.setFontSize(30);
    doc.setTextColor('105', '155', '197');
    doc.text(125, 70, 'Amount In Dispute');
    doc.setFontSize(20);
    doc.setFontType('bold');
    doc.text(125, 90, UtilsService.currencyForLocale(this.total_disputed['total']));
    doc.setFontType('normal');
    doc.setTextColor('105', '155', '197');
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

    doc.addImage(imgData, 'PNG', 20, yOffset - 10, 640, 270, undefined, 'FAST');
    const table = doc.autoTableHtmlToJson(content);
    doc.autoTable(table.columns, table.data, {
      startY: 420,
      margin: 125,
      tableWidth: 425,
      headerStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
        halign: 'center',
        valign: 'middle'
      },
      bodyStyles: {
        lineWidth: 1,
        lineColor: [0, 0, 0],
        halign: 'right',
        valign: 'middle'
      },
      columnStyles: {
        0: {halign: 'center'},
      },
      createdCell: function(cell, data) { cell.styles.fillColor = [255, 255, 255]; }
    });
    window.open(URL.createObjectURL(doc.output('blob')));
    // doc.save('case_' + this.case_id + '_amount_in_dispute.pdf');
  }
/**
 * Destroy amount in dispute component life cycle method. Destroy chart and clear canvas context.
 */
  ngOnDestroy(): void {
    if (this.ctx && this.chart) {
      this.ctx.clearRect(0, 0, 100, 100);
      this.chart.destroy();
    }
    this.subscription.unsubscribe();
  }

}
