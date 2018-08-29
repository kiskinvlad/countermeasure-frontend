import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, selectCategoryState, selectDisputesState, selectCasesState } from '@app/shared/ngrx-store/app.states';
import { ActivatedRoute } from '@angular/router';
import { FetchCategories } from '@app/shared/ngrx-store/actions/category.actions';
import { FetchDisputes, FetchDisputesByCase } from '@app/shared/ngrx-store/actions/disputes.actions';
import * as Chart from 'chart.js';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import 'chartjs-plugin-piechart-outlabels';
import { GetCase } from '@app/shared/ngrx-store/actions/cases.actions';
import {UtilsService} from '@shared/utils.service';

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

  public issue_chart: Chart;
  public categories: Array<any> = [];
  public disputes: Array<any> = [];
  public grouped_categories: Array<any> = [];
  public total_issues: any = [];
  public ctx: any;
  private getCategoryState$: Observable<any>;
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
 */
  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
  ) {
    this.getCategoryState$ = this.store.select(selectCategoryState);
    this.getDisputesState$ = this.store.select(selectDisputesState);
    this.getCaseState$ = this.store.select(selectCasesState);
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

    this.subscription = this.getCaseState$.subscribe((case_state) => {
      this.errorMessage = case_state.errorMessage;
      this.case_name = case_state.name;
      this.matter_id = case_state.matter_id;
    });

    const payload = {
      filter_param: { 'id': this.case_id },
      sort_param: { field: 'order_position' }
    };
    this.store.dispatch(new FetchCategories(payload));
    this.store.dispatch(new FetchDisputesByCase({case_id: this.case_id}));
    this.store.dispatch(new GetCase({case_id: this.case_id}));
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
    const backgroundColors = ['#082948', '#699bc5', '#c46158', '#9180ac', '#f3aeab', '#d2b6d4', '#ecaecd', '#f3aeab', '#9ac066', '#0349ca',
    '#0f544f', '#076e4e', '#b0e0e6', '#f0f8ff', '#9ac066'];
    for (let i = 0; i < data.length; i++) {
      if (i > 15) {
        values[15] += parseFloat(data[i].total).toFixed(0);
        labels[15] = 'Others';
      } else {
        labels.push(data[i].param);
        values.push(parseFloat(data[i].total).toFixed(0));
      }
    }
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.issue_chart = new Chart(this.ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Total',
            backgroundColor: backgroundColors,
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
        layout: {
          padding: {
            top: 60,
            bottom: 60
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
                const value = UtilsService.currencyForLocale(parseFloat(chartData.dataset.data[index]));
                const percents = (Math.abs(chartData.percent) * 100).toFixed(0) + '%';
                const firstLine = label + ' (' + percents + ')';
                const secondLine = value;
                return firstLine + '\n' + secondLine;
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
    doc.text(125, 70, 'Issues In Dispute');
    doc.line(25, 25, 110, 25);
    doc.setTextColor('105', '155', '197');
    doc.setFontSize(12);

    height = doc.getTextDimensions(this.case_name).h * doc.splitTextToSize(this.case_name, 100).length;
    doc.text(25, 45, doc.splitTextToSize(this.case_name, 100));
    doc.text(25, 45 + height + 8, doc.splitTextToSize('Matter ID: ' + this.matter_id, 100));
    height += doc.getTextDimensions(doc.splitTextToSize('Matter ID: ' + this.matter_id, 100)).h;
    doc.text(25, 45 + height + 17, doc.splitTextToSize(UtilsService.dateForReports(), 100));
    doc.line(25, 57 + height + 15, 110, 57 + height + 15);
    doc.line(125, 115, 550, 115);

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
 * Destroy issues in dispute component life cycle method
 */
  ngOnDestroy(): void {
    if (this.ctx && this.issue_chart) {
      this.ctx.clearRect(0, 0, 100, 100);
      this.issue_chart.destroy();
    }
    this.subscription.unsubscribe();
  }

}
