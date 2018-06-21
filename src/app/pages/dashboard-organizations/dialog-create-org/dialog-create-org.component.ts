import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs/';
import { Organization } from '@app/shared/models/organization';
import { AppState, selectOrganizationState } from '@app/shared/ngrx-store/app.states';
import { CreateOrganization } from '@app/shared/ngrx-store/actions/organization.actions';
import { ValidatorModule } from '@app/shared/form-validator/validator.module';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ct-dialog-create-org',
  templateUrl: './dialog-create-org.component.html',
  styleUrls: ['./dialog-create-org.component.scss']
})
/**
 * Dialog create organization component
 * @implements {OnInit, OnDestroy}
 */
export class DialogCreateOrgComponent implements OnInit, OnDestroy {
/**
 * @param {Organization} org Current organization param
 * @param {Observable<any>} getState$ State observable param
 * @param {string | null} errorMessage Error message param
 * @param {Subscription} subscription Subscription param
 * @param {FormGroup} orgForm Organization form group param
 * @param {number} orgID Organization id param
 * @param {ValidatorModule} validator Form validaor module param
 */
  org: Organization = new Organization();
  getState$: Observable<any>;
  errorMessage: string | null;
  subscription: Subscription;
  orgForm: FormGroup;
  orgID: number;
  validator: ValidatorModule;
/**
 * @constructor
 * @param {Store<AppState>} store App state store service
 * @param {FormBuilder} fb Organization form builder service
 * @param {NgbActiveModal} activeModal Bootstrap modal state handler service
 */
  constructor(private store: Store<AppState>, private fb: FormBuilder, public activeModal: NgbActiveModal) {
    this.getState$ = this.store.select(selectOrganizationState);
    this.createForm();
    this.validator = new ValidatorModule();
  }
/**
 * Initialize dialog create organization component life cycle method
 */
  ngOnInit() {
    this.subscription = this.getState$.subscribe((state) => {
      this.errorMessage = state.errorMessage;
      this.org = state.organization;

      if (!this.errorMessage) {
        this.orgForm.reset();
      }
    });
  }
/**
 * Destroy dialog create organization component life cycle method
 */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
/**
 * Create form method
 */
  createForm() {
    this.orgForm = this.fb.group ({
      orgName: ['', [Validators.required]],
      memberLimit: ['', [Validators.required, Validators.pattern(/^[1-9]\d*$/)]],
      enabled: true
    });
  }
/**
 * Submit form method
 */
  onSubmit() {
    const formModel = this.orgForm.value;
    const data = {
      org_name: formModel.orgName,
      member_limit: formModel.memberLimit,
      enabled: +formModel.enabled
    };
    this.store.dispatch(new CreateOrganization(data));
    this.activeModal.close('Submit');
  }

}
