import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryTaxesComponent } from './summary-taxes.component';

describe('SummaryTaxesComponent', () => {
  let component: SummaryTaxesComponent;
  let fixture: ComponentFixture<SummaryTaxesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryTaxesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryTaxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
