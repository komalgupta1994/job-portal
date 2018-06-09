import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderAdsComponent } from './header-ads.component';

describe('HeaderAdsComponent', () => {
  let component: HeaderAdsComponent;
  let fixture: ComponentFixture<HeaderAdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderAdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
