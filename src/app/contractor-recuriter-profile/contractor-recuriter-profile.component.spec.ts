import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorRecuriterProfileComponent } from './contractor-recuriter-profile.component';

describe('ContractorRecuriterProfileComponent', () => {
  let component: ContractorRecuriterProfileComponent;
  let fixture: ComponentFixture<ContractorRecuriterProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorRecuriterProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorRecuriterProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
