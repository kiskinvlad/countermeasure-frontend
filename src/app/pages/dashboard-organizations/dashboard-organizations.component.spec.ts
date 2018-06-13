import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOrganizationsComponent } from './dashboard-organizations.component';

describe('DashboardOrganizationsComponent', () => {
  let component: DashboardOrganizationsComponent;
  let fixture: ComponentFixture<DashboardOrganizationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardOrganizationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardOrganizationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
