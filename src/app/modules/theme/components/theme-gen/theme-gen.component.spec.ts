import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeGenComponent } from './theme-gen.component';

describe('ThemeGenComponent', () => {
  let component: ThemeGenComponent;
  let fixture: ComponentFixture<ThemeGenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThemeGenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeGenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
