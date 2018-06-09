import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorViewProfileComponent } from './contractor-view-profile.component';

describe('ContractorViewProfileComponent', () => {
  let component: ContractorViewProfileComponent;
  let fixture: ComponentFixture<ContractorViewProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorViewProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorViewProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
