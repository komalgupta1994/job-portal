import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterSearchresultLoggedinComponent } from './recruiter-searchresult-loggedin.component';

describe('RecruiterSearchresultLoggedinComponent', () => {
  let component: RecruiterSearchresultLoggedinComponent;
  let fixture: ComponentFixture<RecruiterSearchresultLoggedinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruiterSearchresultLoggedinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterSearchresultLoggedinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
