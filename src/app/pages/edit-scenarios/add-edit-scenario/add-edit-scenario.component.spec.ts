import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditScenarioComponent } from './add-edit-scenario.component';

describe('AddEditScenarioComponent', () => {
  let component: AddEditScenarioComponent;
  let fixture: ComponentFixture<AddEditScenarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditScenarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditScenarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
