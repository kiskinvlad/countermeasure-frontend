import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTaxComponent } from './add-edit-tax.component';

describe('AddEditTaxComponent', () => {
  let component: AddEditTaxComponent;
  let fixture: ComponentFixture<AddEditTaxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditTaxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
