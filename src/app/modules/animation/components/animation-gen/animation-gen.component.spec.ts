import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimationGenComponent } from './animation-gen.component';

describe('AnimationGenComponent', () => {
  let component: AnimationGenComponent;
  let fixture: ComponentFixture<AnimationGenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimationGenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimationGenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
