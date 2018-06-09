import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewContractorProfileComponent } from './view-contractor-profile.component';

describe('ViewContractorProfileComponent', () => {
  let component: ViewContractorProfileComponent;
  let fixture: ComponentFixture<ViewContractorProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewContractorProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewContractorProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
