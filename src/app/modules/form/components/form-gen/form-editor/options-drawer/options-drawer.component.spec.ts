import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OptionsDrawerComponent } from './options-drawer.component';

describe('OptionsDrawerComponent', () => {
  let component: OptionsDrawerComponent;
  let fixture: ComponentFixture<OptionsDrawerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionsDrawerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionsDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
