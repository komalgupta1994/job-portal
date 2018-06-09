import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterJobPostingComponent } from './recruiter-job-posting.component';

describe('RecruiterJobPostingComponent', () => {
  let component: RecruiterJobPostingComponent;
  let fixture: ComponentFixture<RecruiterJobPostingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruiterJobPostingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterJobPostingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
