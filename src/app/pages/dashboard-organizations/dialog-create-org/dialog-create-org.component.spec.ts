import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateOrgComponent } from './dialog-create-org.component';

describe('DialogCreateOrgComponent', () => {
  let component: DialogCreateOrgComponent;
  let fixture: ComponentFixture<DialogCreateOrgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCreateOrgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCreateOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
