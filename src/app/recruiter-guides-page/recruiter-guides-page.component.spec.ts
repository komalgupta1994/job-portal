import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterGuidesPageComponent } from './recruiter-guides-page.component';

describe('RecruiterGuidesPageComponent', () => {
  let component: RecruiterGuidesPageComponent;
  let fixture: ComponentFixture<RecruiterGuidesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruiterGuidesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterGuidesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
