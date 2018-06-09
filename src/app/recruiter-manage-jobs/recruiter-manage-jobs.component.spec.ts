import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterManageJobsComponent } from './recruiter-manage-jobs.component';

describe('RecruiterManageJobsComponent', () => {
  let component: RecruiterManageJobsComponent;
  let fixture: ComponentFixture<RecruiterManageJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruiterManageJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterManageJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
