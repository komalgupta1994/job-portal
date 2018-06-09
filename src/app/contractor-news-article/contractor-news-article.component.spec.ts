import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorNewsArticleComponent } from './contractor-news-article.component';

describe('ContractorNewsArticleComponent', () => {
  let component: ContractorNewsArticleComponent;
  let fixture: ComponentFixture<ContractorNewsArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorNewsArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorNewsArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
