import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorLoginFullJobComponent } from './contractor-login-full-job.component';

describe('ContractorLoginFullJobComponent', () => {
  let component: ContractorLoginFullJobComponent;
  let fixture: ComponentFixture<ContractorLoginFullJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorLoginFullJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorLoginFullJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
