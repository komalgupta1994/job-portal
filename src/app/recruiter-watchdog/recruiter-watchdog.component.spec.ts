import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterWatchdogComponent } from './recruiter-watchdog.component';

describe('RecruiterWatchdogComponent', () => {
  let component: RecruiterWatchdogComponent;
  let fixture: ComponentFixture<RecruiterWatchdogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruiterWatchdogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterWatchdogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
