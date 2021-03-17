import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ThemeSheet } from 'src/app/sheets/theme-sheet/theme-sheet';
import { AnimationTemplate } from '../../models/AnimationTemplate';

@Component({
  selector: 'app-animation-gen',
  templateUrl: './animation-gen.component.html',
  styleUrls: ['./animation-gen.component.scss']
})
export class AnimationGenComponent implements OnInit {

  animationTemplate: AnimationTemplate = new AnimationTemplate()

  constructor(private sheet: MatBottomSheet) { }

  ngOnInit(): void {
  }

  openThemeSheet() {
    this.sheet.open(ThemeSheet);
  }

}
