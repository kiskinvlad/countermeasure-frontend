import { Component, ViewChildren, QueryList, OnInit, Output, AfterViewInit, ChangeDetectorRef, EventEmitter, Directive } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/';
import { Store } from '@ngrx/store';
import { AppState, selectDisputesState } from '@app/shared/ngrx-store/app.states';
import { Disputed } from '@app/shared/models/disputed';
import {
  FetchDisputesByCase,
  FetchDisputed,
  CreateDisputed,
  UpdateDisputed,
  RemoveDisputed
} from '@app/shared/ngrx-store/actions/disputes.actions';
import { MyCurrencyFormatterDirective } from '@app/shared/directive/MyCurrencyFormatter/my-currency-formatter.directive';
import { CalcInputFormatterDirective } from '@app/shared/directive/CalcInputFormatter/calc-input-formatter.directive';
import { MyCurrencyPipe } from '@app/shared/pipe/MyCurrency/my-currency.pipe';

@Component({
  selector: 'ct-add-edit-tax',
  templateUrl: './add-edit-tax.component.html',
  styleUrls: ['./add-edit-tax.component.scss'],
  providers: [ MyCurrencyPipe ]
})

export class AddEditTaxComponent implements OnInit, AfterViewInit {

  @ViewChildren(MyCurrencyFormatterDirective) vc: QueryList<MyCurrencyFormatterDirective>;

  @Output() updateCurrencyFormatter = new EventEmitter<string>();

  private getState$: Observable<any>;
  private errorMessage: string | null;
  private subscription: Subscription;
  private btn_remove: boolean;
  public case_id: number;
  public disputed_id: number;
  public disputed: Disputed;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private currencyPipe: MyCurrencyPipe
  ) {
    this.btn_remove = true;
    this.getState$ = this.store.select(selectDisputesState);
  }
/**
 * After view init add/edit tax component life cycle method
 */
  ngAfterViewInit() {
    this.cdr.detectChanges();    
  }
/**
 * Initialize view init add/edit tax component life cycle method
 */
  ngOnInit() {
    this.subscription = this.getState$.subscribe((state) => {
      this.errorMessage = state.errorMessage;
      this.disputed = state.disputed;
      this.updateCurrencyFormatter.emit('updated');
    });
    this.subscription = this.route.params.subscribe(params => {
      this.case_id = +params['case_id'];
      this.disputed_id = +params['disputed_id'];
    });

    if (this.disputed_id) {
      const payload = {
        case_id: this.case_id,
        disputed_t1_ta_id: this.disputed_id
      };

      this.store.dispatch(new FetchDisputed(payload));
    } else {
      this.btn_remove = false;
      this.disputed = new Disputed (); 
    }

  }

  onSubmit() {
    this.disputed['DIFF_total_debt'] = this.disputed['GP_total_debt'] - this.disputed['TP_total_debt'];
    const payload = {
      disputed: this.disputed,
      case_id: this.case_id
    };
    
    if (this.btn_remove) this.store.dispatch(new UpdateDisputed(payload));
    else this.store.dispatch(new CreateDisputed(payload));
    this.router.navigate(['/case/' + (this.case_id) + '/taxes/']);
  }

  onClose() {
    this.router.navigate(['/case/' + (this.case_id) + '/taxes/']);
  }
/**
 * Form remove method
 */
  onRemove() {
    this.disputed['DIFF_total_debt'] = this.disputed['GP_total_debt'] - this.disputed['TP_total_debt'];
    const payload = {
      disputed_id: this.disputed['disputed_t1_ta_id'],
      case_id: this.case_id
    };

    this.store.dispatch(new RemoveDisputed(payload));
    this.router.navigate(['/case/' + (this.case_id) + '/taxes/']);
  }
}
