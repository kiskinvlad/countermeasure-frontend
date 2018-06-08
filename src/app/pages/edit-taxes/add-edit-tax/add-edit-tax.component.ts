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
export class AddEditTaxComponent implements OnInit, AfterViewInit {

  dialogContent: string;
  dialogTitle: string;
  disputed: Disputed;
  btn_remove: boolean;
  public onCloseReason: Subject<string>;

  constructor(
    private bsModalRef: BsModalRef,
    private cdr: ChangeDetectorRef
  ) {
    this.onCloseReason = new Subject();
    this.btn_remove = true;
    this.disputed = new Disputed();
  }
  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  ngOnInit() {
  }

  onSubmit() {
    this.disputed['DIFF_total_debt'] = this.disputed['GP_total_debt'] - this.disputed['TP_total_debt'];
    this.onCloseReason.next('submit');
    this.bsModalRef.hide();
  }

  onClose() {
    this.disputed['DIFF_total_debt'] = this.disputed['GP_total_debt'] - this.disputed['TP_total_debt'];
    this.onCloseReason.next('close');
    this.bsModalRef.hide();
  }

  onRemove() {
    this.disputed['DIFF_total_debt'] = this.disputed['GP_total_debt'] - this.disputed['TP_total_debt'];
    this.onCloseReason.next('remove');
    this.bsModalRef.hide();
  }

  onReset() {
  }
}
