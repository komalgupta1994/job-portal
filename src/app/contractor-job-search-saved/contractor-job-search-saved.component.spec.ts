import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorJobSearchSavedComponent } from './contractor-job-search-saved.component';

describe('ContractorJobSearchSavedComponent', () => {
  let component: ContractorJobSearchSavedComponent;
  let fixture: ComponentFixture<ContractorJobSearchSavedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorJobSearchSavedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorJobSearchSavedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
