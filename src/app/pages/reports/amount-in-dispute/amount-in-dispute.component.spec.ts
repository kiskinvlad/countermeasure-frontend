import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmountInDisputeComponent } from './amount-in-dispute.component';

describe('AmountInDisputeComponent', () => {
  let component: AmountInDisputeComponent;
  let fixture: ComponentFixture<AmountInDisputeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmountInDisputeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmountInDisputeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
