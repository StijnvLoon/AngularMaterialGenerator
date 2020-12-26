import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormCodeComponent } from './form-code.component';

describe('FormCodeComponent', () => {
  let component: FormCodeComponent;
  let fixture: ComponentFixture<FormCodeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
