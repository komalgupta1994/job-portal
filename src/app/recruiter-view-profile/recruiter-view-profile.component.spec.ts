import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterViewProfileComponent } from './recruiter-view-profile.component';

describe('RecruiterViewProfileComponent', () => {
  let component: RecruiterViewProfileComponent;
  let fixture: ComponentFixture<RecruiterViewProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruiterViewProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterViewProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
