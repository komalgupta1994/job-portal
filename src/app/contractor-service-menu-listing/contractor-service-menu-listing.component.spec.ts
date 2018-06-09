import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorServiceMenuListingComponent } from './contractor-service-menu-listing.component';

describe('ContractorServiceMenuListingComponent', () => {
  let component: ContractorServiceMenuListingComponent;
  let fixture: ComponentFixture<ContractorServiceMenuListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorServiceMenuListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorServiceMenuListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
