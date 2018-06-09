import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterHelpComponent } from './recruiter-help.component';

describe('RecruiterHelpComponent', () => {
  let component: RecruiterHelpComponent;
  let fixture: ComponentFixture<RecruiterHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruiterHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
