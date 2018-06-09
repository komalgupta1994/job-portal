import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorSignUpComponent } from './contractor-sign-up.component';

describe('ContractorSignUpComponent', () => {
  let component: ContractorSignUpComponent;
  let fixture: ComponentFixture<ContractorSignUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorSignUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
