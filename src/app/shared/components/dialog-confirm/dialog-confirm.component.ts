import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'ct-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.scss']
})
/**
 * Dialog create case component
 * @implements {OnInit}
 */
export class DialogConfirmComponent implements OnInit, OnDestroy {
/**
 * @param {string} dialogContent Modal content param
 * @param {string} dialogTitle Modal title param
 * @param {FormGroup} formGroup Modal form group param
 * @param {Subject<string>} onCloseReason Modal close reason param
 */
  dialogContent: string;
  dialogTitle: string;
  public onCloseReason: Subject<boolean>;
/**
 * @constructor
 * @param {BsModalRef} bsModalRef Bootstrap modal reference param
 */
  constructor(
    public bsModalRef: BsModalRef
  ) { }
/**
 * Initialize dialog create case component life cycle method
 */
  ngOnInit() {
    this.onCloseReason = new Subject();
  }
/**
 * Submit form method
 */
  onAgree() {
    this.onCloseReason.next(true);
    this.bsModalRef.hide();
  }
/**
 * Close form method
 */
  onDisagree() {
    this.onCloseReason.next(false);
    this.bsModalRef.hide();
  }

  ngOnDestroy() {
    this.onCloseReason.next(false);
  }
}
