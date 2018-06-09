import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentBottomLeftAdsComponent } from './content-bottom-left-ads.component';

describe('ContentBottomLeftAdsComponent', () => {
  let component: ContentBottomLeftAdsComponent;
  let fixture: ComponentFixture<ContentBottomLeftAdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentBottomLeftAdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentBottomLeftAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
