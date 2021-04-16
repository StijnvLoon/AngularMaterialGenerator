import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ThemeSheet } from 'src/app/sheets/theme-sheet/theme-sheet';
import { AnimationState } from '../../models/AnimationState';
import { AnimationTemplate } from '../../models/AnimationTemplate';
import { AnimationTransition } from '../../models/AnimationTransition';
import { CssValue } from '../../models/CssValue';
import { AnimationService } from '../../services/animation.service';

@Component({
  selector: 'app-animation-gen',
  templateUrl: './animation-gen.component.html',
  styleUrls: ['./animation-gen.component.scss']
})
export class AnimationGenComponent implements OnInit {

  animationTemplate: AnimationTemplate = new AnimationTemplate()

  constructor(private sheet: MatBottomSheet, private animationService: AnimationService) { }

  ngOnInit(): void {
    const state1: AnimationState = new AnimationState("closed", [
      new CssValue('background-color', 'red'),
      new CssValue('height', '50px'),
      new CssValue('width', '100px')
    ])
    const state2: AnimationState = new AnimationState("open", [
      new CssValue('background-color', 'green'),
      new CssValue('height', '200px'),
      new CssValue('width', '100px')
    ])
    this.animationTemplate.statesMap.set(state1.name, state1)
    this.animationTemplate.statesMap.set(state2.name, state2)

    this.animationService.selectedState = state1

    const transition1: AnimationTransition = new AnimationTransition(state1.name, state2.name)
    const transition2: AnimationTransition = new AnimationTransition(state2.name, state1.name)
    this.animationTemplate.transitionsList.push(transition1, transition2)
  }

  openThemeSheet() {
    this.sheet.open(ThemeSheet);
  }

}
