import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store'; 
import { Observable, Subscription } from 'rxjs/';
import { FetchCases } from '../../shared/ngrx-store/actions/cases.actions';
import { AppState, selectCasesState } from '../../shared/ngrx-store/app.states';

@Component({
  selector: 'ct-dashboard-case',
  templateUrl: './dashboard-case.component.html',
  styleUrls: ['./dashboard-case.component.scss']
})
export class DashboardCaseComponent implements OnInit {

  public cases: Array<any> = [];
  getState$: Observable<any>;
  errorMessage: string | null;
  subscription: Subscription;
  constructor(
    private store: Store<AppState>
  ) { 
    this.cases.push(
      { matter_id: '45182', name: 'Mikes Shipping Inc - T2 Dispute', last_updated: 'Tue, April 24 4:30PM by Rachel Beck', actions: ['View', 'Edit', 'Copy'] },
      { matter_id: '45182', name: 'Mikes Shipping Inc - T2 Dispute', last_updated: 'Tue, April 24 4:30PM by Rachel Beck', actions: ['View', 'Edit', 'Copy'] },
      { matter_id: '45182', name: 'Mikes Shipping Inc - T2 Dispute', last_updated: 'Tue, April 24 4:30PM by Rachel Beck', actions: ['View', 'Edit', 'Copy'] },
      { matter_id: '45182', name: 'Mikes Shipping Inc - T2 Dispute', last_updated: 'Tue, April 24 4:30PM by Rachel Beck', actions: ['View', 'Edit', 'Copy'] },
      { matter_id: '45182', name: 'Mikes Shipping Inc - T2 Dispute', last_updated: 'Tue, April 24 4:30PM by Rachel Beck', actions: ['View', 'Edit', 'Copy'] },
    );
    this.getState$ = this.store.select(selectCasesState);
  }

  ngOnInit() {
    this.subscription = this.getState$.subscribe((state) => {
      console.log("subscription cases change", state);
      
      this.cases = state.cases.map(item => {
        const last_updated_date = (new Date(item.updatedAt)).toLocaleString("en-us", {weekday: "long", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit"});
        const last_updated = last_updated_date + " by " + item.updatedBy;
        return {...item, last_updated}
      });
      this.errorMessage = state.errorMessage;
    });

    const payload = {
      filter_param: { "id": 1 },
      sort_param: { "id": 1, field: "matter_id"},
      page_number: 2,
      items_per_page: 2
    };
    this.store.dispatch(new FetchCases(payload))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
