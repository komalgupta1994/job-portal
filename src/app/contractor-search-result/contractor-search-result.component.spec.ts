import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorSearchResultComponent } from './contractor-search-result.component';

describe('ContractorSearchResultComponent', () => {
  let component: ContractorSearchResultComponent;
  let fixture: ComponentFixture<ContractorSearchResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorSearchResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
