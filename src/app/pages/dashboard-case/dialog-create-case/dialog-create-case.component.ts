import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs/Subject';


@Component({
  selector: 'ct-dialog-create-case',
  templateUrl: './dialog-create-case.component.html',
  styleUrls: ['./dialog-create-case.component.scss']
})
export class DialogCreateCaseComponent implements OnInit {

  dialogContent: string;
  dialogTitle: string;
  formGroup: FormGroup;
  public onCloseReason: Subject<string>;

  constructor(
    public bsModalRef: BsModalRef
  ) { }

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
 
  onSubmit() {
    this.onCloseReason.next('submit');
    this.bsModalRef.hide();
  }

  onClose() {
    this.onCloseReason.next('close');
    this.bsModalRef.hide();
  }
 
  onReset() {
    this.formGroup.reset();
  }
}