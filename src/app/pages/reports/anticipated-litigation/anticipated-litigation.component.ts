import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, selectScenarioState } from '@app/shared/ngrx-store/app.states';
import { ActivatedRoute } from '@angular/router';
import { FetchSceneries } from '@app/shared/ngrx-store/actions/scenario.actions';
import * as Chart from 'chart.js';
import * as jsPDF from 'jspdf';
import 'chart.piecelabel.js';
import 'jspdf-autotable';
import 'chartjs-plugin-datalabels';
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
    this.getState$ = this.store.select(selectScenarioState);
  }
/**
 * Initialize anticipated litigation component life cycle method
 */
  ngOnInit() {
    this.subscription = this.getState$.subscribe((state) => {
      this.errorMessage = state.errorMessage;
      this.scenarios = (state.sceneries || []).map(item => Object.assign({}, item));
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

    const payload = {
      case_id: this.case_id
    };
    this.store.dispatch(new FetchSceneries(payload));
  }
/**
 * Create and download pdf method
 */
  public downloadPdf(): void {
    const header = this.header.nativeElement;
    const content = this.pdf.nativeElement;
    const imgData = this.canvas.nativeElement.toDataURL('image/png');
    const headerpolicy = this.headerpolicy.nativeElement;

    const doc = new jsPDF('p', 'pt', 'a4', true);
    doc.setDrawColor(0, 40, 63);
    doc.line(85, 25, 520, 25);
    doc.fromHTML(header, 85, 25);
    doc.line(85, 115, 520, 115);
    doc.fromHTML(headerpolicy, 85, 130, {'width': 440});
    doc.addImage(imgData, 'PNG', 75, 355, 440, 210, undefined, 'FAST');
    const table = doc.autoTableHtmlToJson(content);
    doc.autoTable(table.columns, table.data, {
      startY: 580,
      margin: 95,
      tableWidth: 420,
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
                return label + ': (' + tooltipItem.xLabel + '$, ' + tooltipItem.yLabel + '%)';
             },
             title: function() {
              return false;
            },
          }
       },
       plugins: {
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
    this.ctx.clearRect(0, 0, 100, 100);
    this.chart.destroy();
    this.subscription.unsubscribe();
  }

}
