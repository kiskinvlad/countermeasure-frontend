import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, selectCategoryState, selectDisputesState } from '@app/shared/ngrx-store/app.states';
import { ActivatedRoute } from '@angular/router';
import { FetchCategories } from '@app/shared/ngrx-store/actions/category.actions';
import { FetchDisputes, FetchDisputesByCase } from '@app/shared/ngrx-store/actions/disputes.actions';
import * as Chart from 'chart.js';
import * as jsPDF from 'jspdf';
import 'chart.piecelabel.js';
import 'jspdf-autotable';

@Component({
  selector: 'ct-issues-in-dispute',
  templateUrl: './issues-in-dispute.component.html',
  styleUrls: ['./issues-in-dispute.component.scss']
})
/**
 * Issues in dispute component.
 * @implements {OnInit, OnDestroy}
 */
export class IssuesInDisputeComponent implements OnInit, OnDestroy {
/**
 * @param {ElementRef} pdf Pdf table element refernce param
 * @param {ElementRef} header Pdf header element reference param
 * @param {ElementRef} canvas Pdf chart element reference param
 * @param {Chart} issue_chart Chart object param
 * @param {any} ctx Canvas element context param
 * @param {Array<any>} categories Categories array param
 * @param {Array<any>} disputes Taxes array param
 * @param {Array<any>} grouped_categories Grouped categories array param
 * @param {Observable<any>} getCategoryState$ Category state observable param
 * @param {Observable<any>} getDisputesState$ Taxes state observable param
 * @param {string | null} errorMessage Error message param
 * @param {Subscription} subscription Subscription param
 * @param {number} case_id Current case id param
 */
  @ViewChild('pdf') pdf: ElementRef;
  @ViewChild('header') header: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;

  public issue_chart: Chart;
  public categories: Array<any> = [];
  public disputes: Array<any> = [];
  public grouped_categories: Array<any> = [];
  public total_issues: any = [];
  public ctx: any;
  private getCategoryState$: Observable<any>;
  private getDisputesState$: Observable<any>;
  private errorMessage: string | null;
  private subscription: Subscription;
  private case_id: number;
/**
 * @constructor
 * @param {ActivatedRoute} route Current route state service
 * @param {Store<AppState>} store App state store service
 */
  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
  ) {
    this.getCategoryState$ = this.store.select(selectCategoryState);
    this.getDisputesState$ = this.store.select(selectDisputesState);
  }
/**
 * Issues in dispute component life cycle method
 */
  ngOnInit() {
    this.subscription = this.getCategoryState$.subscribe((state) => {
      this.errorMessage = state.errorMessage;
      this.categories = (state.categories || []).map(item => {
        return {...item };
      });
      this.grouped_categories = this.groupBy(this.categories, 'name');
      this.subscription = this.getDisputesState$.subscribe((disputes_state) => {
        this.errorMessage = disputes_state.errorMessage;
        this.disputes = (disputes_state.disputes || []).map(item => {
          return {...item };
        });
        this.calculateTableData();
        if (this.grouped_categories) {
          this.createChart(this.grouped_categories);
        }
      });
    });

    this.subscription = this.route.params.subscribe(params => {
      this.case_id = +params['case_id'];
    });

    const payload = {
      filter_param: { 'id': this.case_id },
      sort_param: { field: 'order_position' }
    };
    this.store.dispatch(new FetchCategories(payload));
    this.store.dispatch(new FetchDisputesByCase({case_id: this.case_id}));
  }
/**
 * Calculate data for table method
 */
  private calculateTableData(): void {
    this.total_issues['taxes'] = 0;
    this.total_issues['penalties'] = 0;
    this.total_issues['interest'] = 0;
    this.total_issues['total'] = 0;
    this.grouped_categories.forEach((group) => {
      group.taxes = 0;
      group.penalties = 0;
      group.interest = 0;
      group.total = 0;
      group.item.forEach((category) => {
        const current_dispute = this.disputes.find(d => d.disputed_t1_ta_id === category.disputed_t1_ta_id);
        group.taxes += (+current_dispute.DIFF_taxable_income / +category.taxable_income)
          * (+current_dispute.DIFF_net_federal_tax + +current_dispute.DIFF_net_provincial_tax);
        group.penalties += (+current_dispute.DIFF_taxable_income / +category.taxable_income)
          * (+current_dispute.DIFF_gross_negligence_penalty + +current_dispute.DIFF_late_filing_penalty
          + +current_dispute.DIFF_other_penalties + +current_dispute.DIFF_total_penalties);
        group.interest += (+current_dispute.DIFF_taxable_income / +category.taxable_income) * +current_dispute.DIFF_estimated_interest;
      });
      group.total += group.taxes + group.penalties + group.interest;
      this.total_issues['taxes'] += group.taxes;
      this.total_issues['penalties'] += group.penalties;
      this.total_issues['interest'] += group.interest;
      this.total_issues['total'] += group.total;
    });
    this.total_issues['taxes_percents'] = Math.round(this.total_issues['taxes'] / this.total_issues['total'] * 100) + '%';
    this.total_issues['penalties_percents'] = Math.round(this.total_issues['penalties'] / this.total_issues['total'] * 100) + '%';
    this.total_issues['interest_percents'] = Math.round(this.total_issues['interest'] / this.total_issues['total'] * 100) + '%';
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
 * Create chart method
 * @param {any} data Data for chart
 */
  private createChart(data: any): void {
    const labels = [];
    const values = [];
    data.forEach(el => {
      labels.push(el.param);
      values.push(parseFloat(el.total).toFixed(2));
    });
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.issue_chart = new Chart(this.ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Total',
            backgroundColor: ['#082948', '#699bc5', '#c46158'],
            data: values,
            datalabels: {
              display: true,
              formatter: function(value, context) {
                return value + '$';
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
          labels: {
            fontSize: 18
          }
        },
        pieceLabel: {
          render: function (args) {
            return args.percentage + '%';
          },
          fontColor: '#082948',
          fontSize: 18,
          position: 'outside',
          segment: true,
          outsidePadding: 4,
          overlap: true
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

    const doc = new jsPDF('p', 'pt', 'a4', true);
    doc.setDrawColor(0, 40, 63);
    doc.line(130, 25, 480, 25);
    doc.fromHTML(header, 130, 25);
    doc.line(130, 115, 480, 115);
    doc.addImage(imgData, 'PNG', -20, 150, 620, 270, undefined, 'FAST');
    const table = doc.autoTableHtmlToJson(content);
    doc.autoTable(table.columns, table.data, {
      startY: 420,
      margin: 130,
      tableWidth: 350,
      headerStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
      },
      bodyStyles: {
        lineWidth: 1,
        lineColor: [0, 0, 0]
      }
    });
    window.open(URL.createObjectURL(doc.output('blob')));
    // doc.save('case_' + this.case_id + '_amount_in_dispute.pdf');
  }
/**
 * Destroy issues in dispute component life cycle method
 */
  ngOnDestroy(): void {
    this.ctx.clearRect(0, 0, 100, 100);
    this.issue_chart.destroy();
    this.subscription.unsubscribe();
  }

}
