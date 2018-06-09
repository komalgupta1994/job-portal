import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestNewsListingDetailsComponent } from './latest-news-listing-details.component';

describe('LatestNewsListingDetailsComponent', () => {
  let component: LatestNewsListingDetailsComponent;
  let fixture: ComponentFixture<LatestNewsListingDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LatestNewsListingDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestNewsListingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
