import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorJobSearchComponent } from './contractor-job-search.component';

describe('ContractorJobSearchComponent', () => {
  let component: ContractorJobSearchComponent;
  let fixture: ComponentFixture<ContractorJobSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorJobSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorJobSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
