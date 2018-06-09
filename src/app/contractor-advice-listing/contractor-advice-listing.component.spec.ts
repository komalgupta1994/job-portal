import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorAdviceListingComponent } from './contractor-advice-listing.component';

describe('ContractorAdviceListingComponent', () => {
  let component: ContractorAdviceListingComponent;
  let fixture: ComponentFixture<ContractorAdviceListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorAdviceListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorAdviceListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
