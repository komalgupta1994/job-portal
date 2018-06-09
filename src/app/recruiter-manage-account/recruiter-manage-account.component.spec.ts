import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterManageAccountComponent } from './recruiter-manage-account.component';

describe('RecruiterManageAccountComponent', () => {
  let component: RecruiterManageAccountComponent;
  let fixture: ComponentFixture<RecruiterManageAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruiterManageAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterManageAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
