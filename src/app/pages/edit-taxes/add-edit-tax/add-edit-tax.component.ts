import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs/Subject';
import { Disputed } from '@app/shared/models/disputed';

@Component({
  selector: 'ct-add-edit-tax',
  templateUrl: './add-edit-tax.component.html',
  styleUrls: ['./add-edit-tax.component.scss']
})
/**
 * Add/Edit tax component
 * @implements {OnInit, OnDestroy}
 */
export class AddEditTaxComponent implements OnInit, AfterViewInit {
/**
 * @param {string} dialogContent Modal content param
 * @param {string} dialogTitle Modal title param
 * @param {Disputed} disputed Currrent tax param
 * @param {boolean} btn_remove Button remove state param
 * @param {Subject<string>} onCloseReason Modal close reason param
 */
  dialogContent: string;
  dialogTitle: string;
  disputed: Disputed;
  btn_remove: boolean;
  public onCloseReason: Subject<string>;
/**
 * @constructor
 * @param {BsModalRef} bsModalRef Bootstrap modal reference service
 * @param {ChangeDetectorRef} cdr Change detector reference service
 */
  constructor(
    private bsModalRef: BsModalRef,
    private cdr: ChangeDetectorRef
  ) {
    this.onCloseReason = new Subject();
    this.btn_remove = true;
    this.disputed = new Disputed();
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
  }
/**
 * Form sumbit method
 */
  onSubmit() {
    this.disputed['DIFF_total_debt'] = this.disputed['GP_total_debt'] - this.disputed['TP_total_debt'];
    this.onCloseReason.next('submit');
    this.bsModalRef.hide();
  }
/**
 * Form close method
 */
  onClose() {
    this.disputed['DIFF_total_debt'] = this.disputed['GP_total_debt'] - this.disputed['TP_total_debt'];
    this.onCloseReason.next('close');
    this.bsModalRef.hide();
  }
/**
 * Form remove method
 */
  onRemove() {
    this.disputed['DIFF_total_debt'] = this.disputed['GP_total_debt'] - this.disputed['TP_total_debt'];
    this.onCloseReason.next('remove');
    this.bsModalRef.hide();
  }
/**
 * Form reset method
 */
  onReset() {
  }
}
