import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorServicesComponent } from './contractor-services.component';

describe('ContractorServicesComponent', () => {
  let component: ContractorServicesComponent;
  let fixture: ComponentFixture<ContractorServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
