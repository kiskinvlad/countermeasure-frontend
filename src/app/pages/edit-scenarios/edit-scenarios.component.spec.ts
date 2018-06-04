import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditScenariosComponent } from './edit-scenarios.component';

describe('EditScenariosComponent', () => {
  let component: EditScenariosComponent;
  let fixture: ComponentFixture<EditScenariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditScenariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditScenariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
