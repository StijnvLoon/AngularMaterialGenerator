import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabRulesComponent } from './tab-rules.component';

describe('TabRulesComponent', () => {
  let component: TabRulesComponent;
  let fixture: ComponentFixture<TabRulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabRulesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
