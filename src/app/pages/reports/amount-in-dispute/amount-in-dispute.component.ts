import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, selectDisputesState } from '@app/shared/ngrx-store/app.states';
import { ActivatedRoute } from '@angular/router';
import { FetchDisputesByCase } from '@app/shared/ngrx-store/actions/disputes.actions';
import * as Chart from 'chart.js';
import * as jsPDF from 'jspdf';
import 'chart.piecelabel.js';
import 'jspdf-autotable';

@Component({
  selector: 'ct-amount-in-dispute',
  templateUrl: './amount-in-dispute.component.html',
  styleUrls: ['./amount-in-dispute.component.scss']
})
export class AmountInDisputeComponent implements OnInit, OnDestroy {
  @ViewChild('pdf') pdf: ElementRef;
  @ViewChild('header') header: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;

  public chart: Chart;
  public ctx: any;
  public disputed: Array<any> = [];
  public grouped_disputed: Array<any> = [];
  public total_disputed: object = {};
  private getState$: Observable<any>;
  private errorMessage: string | null;
  private subscription: Subscription;
  private case_id: number;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
  ) {
    this.getState$ = this.store.select(selectDisputesState);
  }

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

    const payload = {
      case_id: this.case_id
    };
    this.store.dispatch(new FetchDisputesByCase(payload));
  }

  private groupBy(array, param): any[] {
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

  private createChart(data): void {
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

  ngOnDestroy(): void {
    this.ctx.clearRect(0, 0, 100, 100);
    this.chart.destroy();
    this.subscription.unsubscribe();
  }

}
