import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorAccountComponent } from './contractor-account.component';

describe('ContractorAccountComponent', () => {
  let component: ContractorAccountComponent;
  let fixture: ComponentFixture<ContractorAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
