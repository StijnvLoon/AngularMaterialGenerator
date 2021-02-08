import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormGenComponent } from './form-gen.component';

describe('FormGenComponent', () => {
  let component: FormGenComponent;
  let fixture: ComponentFixture<FormGenComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormGenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormGenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
