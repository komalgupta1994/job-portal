import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterViewApplicationsComponent } from './recruiter-view-applications.component';

describe('RecruiterViewApplicationsComponent', () => {
  let component: RecruiterViewApplicationsComponent;
  let fixture: ComponentFixture<RecruiterViewApplicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruiterViewApplicationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterViewApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
