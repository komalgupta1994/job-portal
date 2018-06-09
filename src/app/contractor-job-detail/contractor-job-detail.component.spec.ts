import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorJobDetailComponent } from './contractor-job-detail.component';

describe('ContractorJobDetailComponent', () => {
  let component: ContractorJobDetailComponent;
  let fixture: ComponentFixture<ContractorJobDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorJobDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorJobDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
