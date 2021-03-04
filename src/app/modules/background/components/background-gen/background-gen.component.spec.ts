import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundGenComponent } from './background-gen.component';

describe('BackgroundGenComponent', () => {
  let component: BackgroundGenComponent;
  let fixture: ComponentFixture<BackgroundGenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackgroundGenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackgroundGenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
