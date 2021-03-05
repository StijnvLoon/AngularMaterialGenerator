import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShapeManagerComponent } from './shape-manager.component';

describe('ShapeManagerComponent', () => {
  let component: ShapeManagerComponent;
  let fixture: ComponentFixture<ShapeManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShapeManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShapeManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
