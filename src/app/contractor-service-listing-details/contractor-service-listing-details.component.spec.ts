import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorServiceListingDetailsComponent } from './contractor-service-listing-details.component';

describe('ContractorServiceListingDetailsComponent', () => {
  let component: ContractorServiceListingDetailsComponent;
  let fixture: ComponentFixture<ContractorServiceListingDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorServiceListingDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorServiceListingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
