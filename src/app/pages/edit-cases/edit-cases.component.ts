import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, selectCategoryState, selectCasesState } from '@app/shared/ngrx-store/app.states';
import { GetCase, UpdateCase } from '@app/shared/ngrx-store/actions/cases.actions';

@Component({
  selector: 'ct-edit-cases',
  templateUrl: './edit-cases.component.html',
  styleUrls: ['./edit-cases.component.scss']
})
export class EditCasesComponent implements OnInit {

  public formGroup: FormGroup;
  public categories: Array<any> = [];
  getState$: Observable<any>;
  subscription: Subscription;
  errorMessage: string | null;

  private case_id: number;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
  ) {
    this.getState$ = this.store.select(selectCasesState);
  }

  ngOnInit() {
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

    this.subscription = this.getState$.subscribe((state) => {
      this.errorMessage = state.errorMessage;
      this.formGroup.controls['matter_id'].setValue(state.matter_id);
      this.formGroup.controls['name'].setValue(state.name);
      this.formGroup.controls['description'].setValue(state.description);
    });

    this.subscription = this.route.params.subscribe(params => {
      this.case_id = +params['case_id'];
    });

    const payload = {
      case_id: this.case_id
    };
    this.store.dispatch(new GetCase(payload));
  }

  onSubmit() {
    const payload = {
      case_id: this.case_id,
      matter_id: this.formGroup.controls['matter_id'].value,
      name: this.formGroup.controls['name'].value,
      description: this.formGroup.controls['description'].value,
    };
    this.store.dispatch(new UpdateCase(payload));
  }
}
