import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuriterSavedWatchDogComponent } from './recuriter-saved-watch-dog.component';

describe('RecuriterSavedWatchDogComponent', () => {
  let component: RecuriterSavedWatchDogComponent;
  let fixture: ComponentFixture<RecuriterSavedWatchDogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecuriterSavedWatchDogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuriterSavedWatchDogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
