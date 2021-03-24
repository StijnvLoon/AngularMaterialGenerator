import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ThemeSheet } from 'src/app/sheets/theme-sheet/theme-sheet';
import { AnimationState } from '../../models/AnimationState';
import { AnimationTemplate } from '../../models/AnimationTemplate';
import { AnimationTransition } from '../../models/AnimationTransition';
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
    const state1: AnimationState = new AnimationState("closed")
    state1.values.set('background-color', 'red')
    state1.values.set('height', '50px')
    state1.values.set('width', '100px')
    const state2: AnimationState = new AnimationState("open")
    state2.values.set('background-color', 'green')
    state2.values.set('height', '200px')
    state2.values.set('width', '100px')
    this.animationTemplate.statesMap.set(state1.name, state1)
    this.animationTemplate.statesMap.set(state2.name, state2)

    this.animationService.selectedState = state1

    const transition: AnimationTransition = new AnimationTransition(state1.name, state2.name)
    this.animationTemplate.transitionsList.push(transition)
  }

  openThemeSheet() {
    this.sheet.open(ThemeSheet);
  }

}
