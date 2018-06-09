import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterSavedSearchComponent } from './recruiter-saved-search.component';

describe('RecruiterSavedSearchComponent', () => {
  let component: RecruiterSavedSearchComponent;
  let fixture: ComponentFixture<RecruiterSavedSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruiterSavedSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterSavedSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
