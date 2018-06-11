import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnticipatedLitigationComponent } from './anticipated-litigation.component';

describe('AnticipatedLitigationComponent', () => {
  let component: AnticipatedLitigationComponent;
  let fixture: ComponentFixture<AnticipatedLitigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnticipatedLitigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnticipatedLitigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
