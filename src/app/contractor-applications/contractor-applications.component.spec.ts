import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorApplicationsComponent } from './contractor-applications.component';

describe('ContractorApplicationsComponent', () => {
  let component: ContractorApplicationsComponent;
  let fixture: ComponentFixture<ContractorApplicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorApplicationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
