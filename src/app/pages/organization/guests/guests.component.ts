import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppState, selectUserState } from '@app/shared/ngrx-store/app.states';
import { FetchUsers } from '@app/shared/ngrx-store/actions/user.actions';
import { User } from '@shared/models/user';

@Component({
  selector: 'ct-guests',
  templateUrl: './guests.component.html',
  styleUrls: ['./guests.component.scss']
})
export class GuestsComponent implements OnInit, OnDestroy {

  private getState$: Observable<any>;
  private getOrgState$: Observable<any>;
  private errorMessage: string | null;
  private subscription: Subscription;
  public orgID: number;
  public itemsPerPage = 10;
  public members: Array<User> = [];
  public currentPage = 1;
  public previousPage = 1;
  public totalCount = 0;
  public searchForm: FormGroup;
  public enabled: number | null;
  public email: string | null;
  public name: string | null;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.getState$ = this.store.select(selectUserState);
    this.createForm();
  }

  ngOnInit() {
    this.subscription = this.getState$.subscribe((state) => {
      this.errorMessage = state.errorMessage;
      this.members = state.users;
      this.totalCount = state.totalCount;
    });

    const sub = this.route.parent.params.subscribe(params => {
      this.orgID = params['org_id'];
    });
    this.subscription.add(sub);

    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.loadData();
    }
  }

  loadData() {
    const offset = (this.currentPage - 1) * this.itemsPerPage;
    const payload = {
      org_id: this.orgID,
      offset: offset,
      limit: this.itemsPerPage,
      type: 'guest',
      enabled: this.enabled,
      email: this.email,
      name: this.name
    };
    this.store.dispatch(new FetchUsers(payload));
  }

  createForm() {
    this.searchForm = this.fb.group ({
      enabled: '',
      val: '',
      type: 'name',
    });
  }

  onSubmit() {
    const formModel = this.searchForm.value;
    this.enabled = formModel.enabled;
    if (formModel.type === 'email') {
      this.email = formModel.val;
      this.name = null;
    } else {
      this.name = formModel.val;
      this.email = null;
    }
    this.loadData();
  }

  onChangeStatus(event) {
    this.enabled = event.target.value;
    this.loadData();
  }

}
