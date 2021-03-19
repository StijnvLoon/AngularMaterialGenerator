import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimationEditorComponent } from './animation-editor.component';

describe('AnimationEditorComponent', () => {
  let component: AnimationEditorComponent;
  let fixture: ComponentFixture<AnimationEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimationEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimationEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
