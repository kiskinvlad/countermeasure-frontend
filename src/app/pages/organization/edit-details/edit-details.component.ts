import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs/';
import { Organization } from '@app/shared/models/organization';
import { AppState, selectOrganizationState } from '@app/shared/ngrx-store/app.states';
import { FetchOrganization, UpdateOrganization } from '@app/shared/ngrx-store/actions/organization.actions';
import { ValidatorModule } from '@app/shared/form-validator/validator.module';

@Component({
  selector: 'ct-edit-details',
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.scss']
})
export class EditDetailsComponent implements OnInit, OnDestroy {

  org: Organization = new Organization();
  getState$: Observable<any>;
  errorMessage: string | null;
  subscription: Subscription;
  orgForm: FormGroup;
  orgId: number;
  validator: ValidatorModule;

  constructor(private store: Store<AppState>, private fb: FormBuilder, private route: ActivatedRoute) {
    this.getState$ = this.store.select(selectOrganizationState);
    this.createForm();
    this.validator = new ValidatorModule();
  }

  ngOnInit() {
    this.subscription = this.getState$.subscribe((state) => {
      this.errorMessage = state.errorMessage;
      this.org = state.organization;

      if (!this.errorMessage) {
        this.orgForm.reset();
      }
      this.setFormValues();
    });

    this.route.parent.params.subscribe(params => {
      this.orgId = params['org_id'];
      this.getOrganization();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  createForm() {
    this.orgForm = this.fb.group ({
      orgName: '',
      firstName: '',
      lastName: '',
      phone: ['', Validators.maxLength(15)],
      email: ['', Validators.email]
    });
  }

  getOrganization(): void {
    this.store.dispatch(new FetchOrganization({org_id: this.orgId}));
  }

  onSubmit() {
    const formModel = this.orgForm.value;
    const data = {
      org_id: this.orgId,
      org_name: formModel.orgName,
      first_name: formModel.firstName,
      last_name: formModel.lastName,
      phone: formModel.phone,
      email: formModel.email
    };
    this.store.dispatch(new UpdateOrganization(data));
  }

  setFormValues() {
    if (!this.errorMessage && this.org) {
      this.orgForm.setValue({
        orgName: this.org.org_name,
        firstName: this.org.first_name,
        lastName: this.org.last_name,
        phone: this.org.phone,
        email: this.org.email
      });
    }
  }

}