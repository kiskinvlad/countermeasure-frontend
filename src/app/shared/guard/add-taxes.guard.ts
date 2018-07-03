import { Injectable } from '@angular/core';
import { CanActivate, Router, CanDeactivate } from '@angular/router';
import { FormGroup, Form } from '@angular/forms';
import { Subscription, Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Store } from '@ngrx/store';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DialogConfirmComponent } from '../components/dialog-confirm/dialog-confirm.component';
import { AddEditTaxComponent } from '@app/pages/edit-taxes/add-edit-tax/add-edit-tax.component';

export interface FormComponent {
  form: FormGroup
}

@Injectable()
/**
 * Authentication guard service. Check user authentication, token expired, prevent unauthorized routing
 * @implements {CanDeactivate}
 */

export class AddTaxesGuard implements CanDeactivate<AddEditTaxComponent> {
/**
 * @param {Store<any>} getState$ App state param
 * @param {string | null} errorMessage Error message param
 * @param {Subscription} subscription Subscription param
 * @param {boolean} isAuth User authentication state param
 */
  getState$: Store<any>;
  subscription: Subscription;
  confirmDlgRef: BsModalRef;
  dialogConfig = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false
  };
/**
 * @constructor
 * @param {BsModalService} modalService Modal dialog service
 */
  constructor(
    private modalService: BsModalService
  ) { }

  canDeactivate(component: AddEditTaxComponent) {
    if(component.result === undefined) {
      const subject = new Subject<boolean>();
      this.confirmDlgRef = this.modalService.show(DialogConfirmComponent, this.dialogConfig);
      this.confirmDlgRef.content.dialogContent = 'The form has not been submitted yet, do you really want to leave page?';
      this.confirmDlgRef.content.onCloseReason = subject;

      return subject.asObservable();
    } else {
      return true;
    }
  }
}
