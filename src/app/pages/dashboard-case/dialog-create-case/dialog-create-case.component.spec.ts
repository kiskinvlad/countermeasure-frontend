import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateCaseComponent } from './dialog-create-case.component';

describe('DialogCreateCaseComponent', () => {
  let component: DialogCreateCaseComponent;
  let fixture: ComponentFixture<DialogCreateCaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCreateCaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCreateCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
