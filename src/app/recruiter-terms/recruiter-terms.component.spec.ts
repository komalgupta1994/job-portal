import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterTermsComponent } from './recruiter-terms.component';

describe('RecruiterTermsComponent', () => {
  let component: RecruiterTermsComponent;
  let fixture: ComponentFixture<RecruiterTermsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruiterTermsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
