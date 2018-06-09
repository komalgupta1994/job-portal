import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterPreviewJobComponent } from './recruiter-preview-job.component';

describe('RecruiterPreviewJobComponent', () => {
  let component: RecruiterPreviewJobComponent;
  let fixture: ComponentFixture<RecruiterPreviewJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruiterPreviewJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterPreviewJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
