import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorAdviceMenuListingComponent } from './contractor-advice-menu-listing.component';

describe('ContractorAdviceMenuListingComponent', () => {
  let component: ContractorAdviceMenuListingComponent;
  let fixture: ComponentFixture<ContractorAdviceMenuListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorAdviceMenuListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorAdviceMenuListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
