import { Component, ViewChildren, QueryList, OnInit, OnDestroy, Output, 
        AfterViewInit, ChangeDetectorRef, EventEmitter, Directive } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Observable, Subscription } from 'rxjs/';
import { Store } from '@ngrx/store';
import { AppState, selectDisputesState } from '@app/shared/ngrx-store/app.states';
import { Disputed } from '@app/shared/models/disputed';
import {
  FetchDisputesByCase,
  FetchDisputed,
  CreateDisputed,
  UpdateDisputed,
  RemoveDisputed,
  FetchStateInfor
} from '@app/shared/ngrx-store/actions/disputes.actions';
import { MyCurrencyFormatterDirective } from '@app/shared/directive/MyCurrencyFormatter/my-currency-formatter.directive';
import { CalcInputFormatterDirective } from '@app/shared/directive/CalcInputFormatter/calc-input-formatter.directive';
import { MyCurrencyPipe } from '@app/shared/pipe/MyCurrency/my-currency.pipe';
import { DialogConfirmComponent } from '@app/shared/components/dialog-confirm/dialog-confirm.component'

@Component({
  selector: 'ct-add-edit-tax',
  templateUrl: './add-edit-tax.component.html',
  styleUrls: ['./add-edit-tax.component.scss'],
  providers: [ MyCurrencyPipe ]
})
/**
 * Add/Edit tax component
 * @implements {OnInit, AfterViewInit, OnDestroy}
 */
export class AddEditTaxComponent implements OnInit, AfterViewInit, OnDestroy {
  
  @ViewChildren(MyCurrencyFormatterDirective) vc: QueryList<MyCurrencyFormatterDirective>;

  @Output() updateCurrencyFormatter = new EventEmitter<string>();

  private getState$: Observable<any>;
  private getRouterState$: Observable<any>;
  private errorMessage: string | null;
  private subscription: Subscription;
  private btn_remove: boolean;
  private changed: boolean;
  private confirmDlgRef: BsModalRef;
  private dialogConfig = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false
  };
  public result: string;
  public case_id: number;
  public disputed_id: number;
  public disputed: Disputed;
  public taxes: Array<any>;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private currencyPipe: MyCurrencyPipe,
    private confirmDlgService: BsModalService,
  ) {
    this.result = undefined;
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
      if(this.btn_remove) this.disputed = state.disputed;
      this.taxes = state.states;
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
    
    this.store.dispatch(new FetchStateInfor());
  }

  onSubmit() {
    this.result = 'submit';
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
    this.result = 'close';
    this.router.navigate(['/case/' + (this.case_id) + '/taxes/']);
  }
/**
 * Form remove method
 */
  onRemove() {
    this.result = 'remove';
    this.disputed['DIFF_total_debt'] = this.disputed['GP_total_debt'] - this.disputed['TP_total_debt'];
    const payload = {
      disputed_id: this.disputed['disputed_t1_ta_id'],
      case_id: this.case_id
    };

    this.store.dispatch(new RemoveDisputed(payload));
    this.router.navigate(['/case/' + (this.case_id) + '/taxes/']);
  }
/**
 * Destroy add-taxes component life cycle method
 */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
