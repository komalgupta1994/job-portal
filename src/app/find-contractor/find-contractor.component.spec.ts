import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindContractorComponent } from './find-contractor.component';

describe('FindContractorComponent', () => {
  let component: FindContractorComponent;
  let fixture: ComponentFixture<FindContractorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindContractorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindContractorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
