import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs/';
import { AppState } from '../../ngrx-store/app.states';

@Component({
  selector: 'ct-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SideBarComponent implements OnInit, OnDestroy {

  @Input()
  menuType: string;

  constructor(
    private store: Store<AppState>
  ) {
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }

}
