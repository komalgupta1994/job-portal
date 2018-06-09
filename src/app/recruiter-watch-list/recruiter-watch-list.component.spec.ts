import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterWatchListComponent } from './recruiter-watch-list.component';

describe('RecruiterWatchListComponent', () => {
  let component: RecruiterWatchListComponent;
  let fixture: ComponentFixture<RecruiterWatchListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruiterWatchListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterWatchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
