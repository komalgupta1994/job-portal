import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorHelpComponent } from './contractor-help.component';

describe('ContractorHelpComponent', () => {
  let component: ContractorHelpComponent;
  let fixture: ComponentFixture<ContractorHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
