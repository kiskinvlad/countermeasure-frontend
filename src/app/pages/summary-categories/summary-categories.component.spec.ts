import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryCategoriesComponent } from './summary-categories.component';

describe('SummaryCategoriesComponent', () => {
  let component: SummaryCategoriesComponent;
  let fixture: ComponentFixture<SummaryCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
