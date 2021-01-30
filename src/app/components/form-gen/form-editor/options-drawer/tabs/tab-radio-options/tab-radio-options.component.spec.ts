import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabRadioOptionsComponent } from './tab-radio-options.component';

describe('TabRadioOptionsComponent', () => {
  let component: TabRadioOptionsComponent;
  let fixture: ComponentFixture<TabRadioOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabRadioOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabRadioOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
