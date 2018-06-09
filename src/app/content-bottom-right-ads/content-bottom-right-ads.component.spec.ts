import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentBottomRightAdsComponent } from './content-bottom-right-ads.component';

describe('ContentBottomRightAdsComponent', () => {
  let component: ContentBottomRightAdsComponent;
  let fixture: ComponentFixture<ContentBottomRightAdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentBottomRightAdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentBottomRightAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
