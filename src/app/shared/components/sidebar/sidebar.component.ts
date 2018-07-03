import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs/';
import { AppState } from '../../ngrx-store/app.states';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ct-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SideBarComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public case_id: string;
  public org_id: string;

  @Input()
  menuType: string;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.case_id = params['case_id'];
      this.org_id = params['org_id'];
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
