import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorHeaderComponent } from './contractor-header.component';

describe('ContractorHeaderComponent', () => {
  let component: ContractorHeaderComponent;
  let fixture: ComponentFixture<ContractorHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
