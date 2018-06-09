import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorAdviceArticleComponent } from './contractor-advice-article.component';

describe('ContractorAdviceArticleComponent', () => {
  let component: ContractorAdviceArticleComponent;
  let fixture: ComponentFixture<ContractorAdviceArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorAdviceArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorAdviceArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
