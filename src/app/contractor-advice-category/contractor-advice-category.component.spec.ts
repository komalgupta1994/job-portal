import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorAdviceCategoryComponent } from './contractor-advice-category.component';

describe('ContractorAdviceCategoryComponent', () => {
  let component: ContractorAdviceCategoryComponent;
  let fixture: ComponentFixture<ContractorAdviceCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorAdviceCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorAdviceCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
