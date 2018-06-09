import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutRecruiterComponent } from './about-recruiter.component';

describe('AboutRecruiterComponent', () => {
  let component: AboutRecruiterComponent;
  let fixture: ComponentFixture<AboutRecruiterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutRecruiterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutRecruiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
