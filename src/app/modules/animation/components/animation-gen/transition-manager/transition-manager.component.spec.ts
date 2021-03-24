import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransitionManagerComponent } from './transition-manager.component';

describe('TransitionManagerComponent', () => {
  let component: TransitionManagerComponent;
  let fixture: ComponentFixture<TransitionManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransitionManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransitionManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
