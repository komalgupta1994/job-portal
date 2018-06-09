import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorNewsCategoryComponent } from './contractor-news-category.component';

describe('ContractorNewsCategoryComponent', () => {
  let component: ContractorNewsCategoryComponent;
  let fixture: ComponentFixture<ContractorNewsCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorNewsCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorNewsCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
