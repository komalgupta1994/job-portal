import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorServiceListingComponent } from './contractor-service-listing.component';

describe('ContractorServiceListingComponent', () => {
  let component: ContractorServiceListingComponent;
  let fixture: ComponentFixture<ContractorServiceListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorServiceListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorServiceListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
