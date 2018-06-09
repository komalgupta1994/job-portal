import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterAdvancedSearchComponent } from './recruiter-advanced-search.component';

describe('RecruiterAdvancedSearchComponent', () => {
  let component: RecruiterAdvancedSearchComponent;
  let fixture: ComponentFixture<RecruiterAdvancedSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruiterAdvancedSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterAdvancedSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
