import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipledSettlementComponent } from './principled-settlement.component';

describe('PrincipledSettlementComponent', () => {
  let component: PrincipledSettlementComponent;
  let fixture: ComponentFixture<PrincipledSettlementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrincipledSettlementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipledSettlementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
