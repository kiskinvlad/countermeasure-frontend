import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs/';
import { AppState } from '../../ngrx-store/app.states';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '@app/core/services/LocalStorageService/local-storage.service';

@Component({
  selector: 'ct-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SideBarComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public case_id: string;
  public userOrg: number;

  @Input()
  menuType: string;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService,
  ) {
    this.userOrg = this.localStorageService.getUserOrgID();
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.case_id = params['case_id'];
    });
  }

  ngOnDestroy(): void {
  }

}
