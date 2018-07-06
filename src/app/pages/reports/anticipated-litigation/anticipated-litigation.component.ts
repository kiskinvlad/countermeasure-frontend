import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, selectScenarioState, selectCasesState } from '@app/shared/ngrx-store/app.states';
import { ActivatedRoute } from '@angular/router';
import { FetchScenarios } from '@app/shared/ngrx-store/actions/scenario.actions';
import * as Chart from 'chart.js';
import * as jsPDF from 'jspdf';
import 'chart.piecelabel.js';
import 'jspdf-autotable';
import 'chartjs-plugin-datalabels';
import { GetCase } from '@app/shared/ngrx-store/actions/cases.actions';
import {UtilsService} from '@shared/utils.service';

@Component({
  selector: 'ct-anticipated-litigation',
  templateUrl: './anticipated-litigation.component.html',
  styleUrls: ['./anticipated-litigation.component.scss']
})
/**
 * Anticipated litigation component.
 * @implements {OnInit, OnDestroy}
 */
export class AnticipatedLitigationComponent implements OnInit, OnDestroy {
/**
 * @param {ElementRef} pdf Pdf table element refernce param
 * @param {ElementRef} header Pdf header element reference param
 * @param {ElementRef} canvas Pdf chart element reference param
 * @param {ElementRef} headerpolicy Pdf additional info reference param
 * @param {Chart} chart Chart object param
 * @param {any} ctx Canvas element context param
 * @param {Array<any>} scenarios Scenarios array param
 * @param {object} total_disputed Total tax count param
 * @param {Observable<any>} getState$ State observable param
 * @param {Observable<any>} getCaseState$ Case state observable param
 * @param {string | null} errorMessage Error message param
 * @param {Subscription} subscription Subscription param
 * @param {number} case_id Current case id param
 */
  @ViewChild('pdf') pdf: ElementRef;
  @ViewChild('header') header: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('headerpolicy') headerpolicy: ElementRef;

  public chart: Chart;
  public ctx: any;
  public scenarios: Array<any> = [];
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
    this.getState$ = this.store.select(selectScenarioState);
    this.getCaseState$ = this.store.select(selectCasesState);
  }
/**
 * Initialize anticipated litigation component life cycle method
 */
  ngOnInit() {
    this.subscription = this.getState$.subscribe((state) => {
      this.errorMessage = state.errorMessage;
      this.scenarios = (state.scenarios || []).map(item => Object.assign({}, item));
      this.scenarios.map(item => {
        item.taxes = Math.abs(+item.taxes);
        item.penalties = Math.abs(+item.penalties);
        item.interest = Math.abs(+item.interest);
        item.savings = item.taxes + item.penalties + item.interest;
        return {...item };
      });
      if (this.scenarios.length > 0) {
        this.scenarios = this.sortBySavings(this.scenarios, 'savings');
        this.createChart(this.scenarios);
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
    this.store.dispatch(new FetchScenarios(payload));
    this.store.dispatch(new GetCase({case_id: this.case_id}));
  }
/**
 * Create and download pdf method
 */
  public downloadPdf(): void {
    const header = this.header.nativeElement;
    const content = this.pdf.nativeElement;
    const imgData = this.canvas.nativeElement.toDataURL('image/png');
    const headerpolicy = this.headerpolicy.nativeElement;
    const yOffset = 150;
    let height;
    const doc = new jsPDF('p', 'pt', 'letter', true);

    doc.setDrawColor(0, 40, 63);
    doc.line(125, 25, 550, 25);
    doc.setFontSize(30);
    doc.setTextColor('105', '155', '197');
    doc.text(125, 70, 'Anticipated Litigation Result');
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
    doc.setTextColor('0', '0', '0');
    doc.text(125, 45 + height + 50, doc.splitTextToSize(
      'We trust that you understand and accept the limits on our ability to accurately predict' +
      'litigation results. If not, please read our Tax Court Appeal Forecasting article.', 425));
    doc.text(125, 45 + height + 100, doc.splitTextToSize(
      'Although tax litigation contains the uncertain and unknowable, we want to bring our best' +
      'guess into the light of day where we can inspect and discuss it. This way, we can work together' +
      'to make the best decisions and maximize your return on investment.', 425));
    doc.text(125, 45 + height + 165, doc.splitTextToSize(
      'We believe - based on our current understanding of the facts, evidence, and law - that if you' +
      'litigated the matter to the fullest extent possible, you would achieve a scenario within the' +
      'highlighted range below.', 425));
    doc.addImage(imgData, 'PNG', 120, yOffset + 165, 425, 180, undefined, 'FAST');
    const table = doc.autoTableHtmlToJson(content);
    doc.autoTable(table.columns, table.data, {
      startY: 515,
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
    doc.setFontSize(8);
    doc.text(125, 45 + height + 550, '* See Principled Settlement Report for a detailed breakdown of each scenario.');
    window.open(URL.createObjectURL(doc.output('blob')));
    // doc.save('case_' + this.case_id + '_amount_in_dispute.pdf');
  }
/**
 * Create chart method
 * @param {any} data Data for chart
 */
  private createChart(data: any): void {
    let values = [];
    const labels = [];
    data.forEach((el, index) => {
      values.push({x: el.savings, y: el.probability});
      values = this.sortBySavings(values, 'x');
      labels.push('Scenario ' + (index + 1));
    });
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.chart = new Chart(this.ctx, {
      type: 'line',
      labels: labels,
      data: {
        labels: labels,
        datasets: [{
          type: 'line',
          label: 'Anticipated Litigation',
          data: values,
          borderColor: '#699bc5',
          borderWidth: 2,
          pointBackgroundColor: '#082948',
          backgroundColor: '#699bc5',
          pointRadius: 10,
          pointHoverRadius: 10,
          fill: false,
          tension: 0,
          showLine: true,
          lineTension: 2,
        }]
      },
      options: {
        elements: {
          line: {
            cubicInterpolationMode: 'monotone'
          }
        },
        scales: {
          xAxes: [{
              type: 'linear',
              gridLines: {
                display: false
              },
              scaleLabel: {
                display: true,
                fontColor: '#082948',
                fontStyle: 'bold',
                labelString: 'Savings ($)'
              },
              ticks: {
                callback: function(label) {
                  return label.toLocaleString('en-US');
                }
              //  beginAtZero: true
              }
          }],
          yAxes: [{
            type: 'linear',
            gridLines: {
              display: false
            },
            scaleLabel: {
              display: true,
              fontColor: '#082948',
              fontStyle: 'bold',
              labelString: 'Probability (%)'
            },
            ticks: {
             // beginAtZero: true
            }
          }]
        },
        tooltips: {
          callbacks: {
             label: function(tooltipItem, data_labels) {
                const label = data_labels.labels[tooltipItem.index];
                return label + ': (' + UtilsService.currencyForLocale(tooltipItem.xLabel) + ', ' + tooltipItem.yLabel + '%)';
             },
             title: function() {
              return false;
            },
          }
       },
       plugins: {
        legend: false,
         datalabels: {
            borderRadius: 10,
            color: '#699bc5',
            font: {
              weight: 'bold'
            },
            formatter: function(value, context) {
              return context.chart.config.data.labels[context.dataIndex].match(/\d+/)[0];
            }
          }
        }
      },
    });
  }
/**
 * Sort scenarios by param method
 * @param {Array<any>} array Array to sort
 * @param {string} param Param for sort
 * @returns {Array<any>}
 */
  private sortBySavings(array: Array<any>, x: string): Array<any> {
    return array.sort((a, b) => b[x] - a[x]);
  }
/**
 * Destroy anticipated litigation component life cycle method
 */
  ngOnDestroy(): void {
    if (this.ctx && this.chart) {
      this.ctx.clearRect(0, 0, 100, 100);
      this.chart.destroy();
    }
    this.subscription.unsubscribe();
  }

}
