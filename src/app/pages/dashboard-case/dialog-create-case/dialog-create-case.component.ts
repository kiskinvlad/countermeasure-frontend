import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs/Subject';


@Component({
  selector: 'ct-dialog-create-case',
  templateUrl: './dialog-create-case.component.html',
  styleUrls: ['./dialog-create-case.component.scss']
})
/**
 * Dialog create case component
 * @implements {OnInit}
 */
export class DialogCreateCaseComponent implements OnInit {
/**
 * @param {string} dialogContent Modal content param
 * @param {string} dialogTitle Modal title param
 * @param {FormGroup} formGroup Modal form group param
 * @param {Subject<string>} onCloseReason Modal close reason param
 */
  dialogContent: string;
  dialogTitle: string;
  formGroup: FormGroup;
  public onCloseReason: Subject<string>;
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
    this.formGroup = new FormGroup({
      matter_id: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      ]),
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20)
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20)
      ])
    });
  }
/**
 * Submit form method
 */
  onSubmit() {
    this.onCloseReason.next('submit');
    this.bsModalRef.hide();
  }
/**
 * Close form method
 */
  onClose() {
    this.onCloseReason.next('close');
    this.bsModalRef.hide();
  }
/**
 * Reset form method
 */
  onReset() {
    this.formGroup.reset();
  }
}
