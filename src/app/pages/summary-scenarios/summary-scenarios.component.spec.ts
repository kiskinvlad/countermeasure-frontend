import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryScenariosComponent } from './summary-scenarios.component';

describe('SummaryScenariosComponent', () => {
  let component: SummaryScenariosComponent;
  let fixture: ComponentFixture<SummaryScenariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryScenariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryScenariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
