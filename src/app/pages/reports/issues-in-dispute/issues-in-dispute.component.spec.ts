import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuesInDisputeComponent } from './issues-in-dispute.component';

describe('IssuesInDisputeComponent', () => {
  let component: IssuesInDisputeComponent;
  let fixture: ComponentFixture<IssuesInDisputeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssuesInDisputeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuesInDisputeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
