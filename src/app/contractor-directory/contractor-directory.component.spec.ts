import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorDirectoryComponent } from './contractor-directory.component';

describe('ContractorDirectoryComponent', () => {
  let component: ContractorDirectoryComponent;
  let fixture: ComponentFixture<ContractorDirectoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorDirectoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorDirectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
