import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutContractorComponent } from './about-contractor.component';

describe('AboutContractorComponent', () => {
  let component: AboutContractorComponent;
  let fixture: ComponentFixture<AboutContractorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutContractorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutContractorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
