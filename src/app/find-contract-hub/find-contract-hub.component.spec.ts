import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindContractHubComponent } from './find-contract-hub.component';

describe('FindContractHubComponent', () => {
  let component: FindContractHubComponent;
  let fixture: ComponentFixture<FindContractHubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindContractHubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindContractHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
