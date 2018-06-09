import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterLostPasswordComponent } from './recruiter-lost-password.component';

describe('RecruiterLostPasswordComponent', () => {
  let component: RecruiterLostPasswordComponent;
  let fixture: ComponentFixture<RecruiterLostPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruiterLostPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterLostPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
