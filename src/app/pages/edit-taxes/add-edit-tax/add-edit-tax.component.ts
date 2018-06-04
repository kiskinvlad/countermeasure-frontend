import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs/Subject';
import { Disputed } from '@app/shared/models/disputed';

@Component({
  selector: 'ct-add-edit-tax',
  templateUrl: './add-edit-tax.component.html',
  styleUrls: ['./add-edit-tax.component.scss']
})
export class AddEditTaxComponent implements OnInit {

  dialogContent: string;
  dialogTitle: string;
  disputed: Disputed;
  public onCloseReason: Subject<string>;

  constructor(
    private bsModalRef: BsModalRef
  ) {
    this.onCloseReason = new Subject();
    this.disputed = new Disputed();
  }

  ngOnInit() {
  }

  onSubmit() {
    this.onCloseReason.next('submit');
    this.bsModalRef.hide();
  }

  onClose() {
    this.onCloseReason.next('close');
    this.bsModalRef.hide();
  }

  onRemove() {
    this.onCloseReason.next('remove');
    this.bsModalRef.hide();
  }

  onReset() {
  }
}
