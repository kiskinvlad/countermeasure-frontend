import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs/';
import { AppState } from '../../ngrx-store/app.states';

@Component({
  selector: 'ct-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit, OnDestroy {

  constructor(
    private store: Store<AppState>
  ) {
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }

}
