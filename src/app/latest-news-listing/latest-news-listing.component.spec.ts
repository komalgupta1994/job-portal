import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestNewsListingComponent } from './latest-news-listing.component';

describe('LatestNewsListingComponent', () => {
  let component: LatestNewsListingComponent;
  let fixture: ComponentFixture<LatestNewsListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LatestNewsListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestNewsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
