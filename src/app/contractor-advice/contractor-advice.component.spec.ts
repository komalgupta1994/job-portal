import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorAdviceComponent } from './contractor-advice.component';

describe('ContractorAdviceComponent', () => {
  let component: ContractorAdviceComponent;
  let fixture: ComponentFixture<ContractorAdviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorAdviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorAdviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
