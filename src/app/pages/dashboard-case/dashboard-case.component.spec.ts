import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCaseComponent } from './dashboard-case.component';

describe('DashboardComponent', () => {
  let component: DashboardCaseComponent;
  let fixture: ComponentFixture<DashboardCaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardCaseComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
