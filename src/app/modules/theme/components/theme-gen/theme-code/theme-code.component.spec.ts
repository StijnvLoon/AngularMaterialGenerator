import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeCodeComponent } from './theme-code.component';

describe('ThemeCodeComponent', () => {
  let component: ThemeCodeComponent;
  let fixture: ComponentFixture<ThemeCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThemeCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
