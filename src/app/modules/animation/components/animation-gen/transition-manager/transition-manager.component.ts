import { Component, Input, OnInit } from '@angular/core';
import { verticalListAnimation, verticalListItemAnimation } from 'src/app/animations/vert-list';
import { AnimationState } from '../../../models/AnimationState';
import { AnimationTransition } from '../../../models/AnimationTransition';
import { AnimationService } from '../../../services/animation.service';

@Component({
  selector: 'app-transition-manager',
  templateUrl: './transition-manager.component.html',
  styleUrls: ['./transition-manager.component.scss'],
  animations: [
    verticalListAnimation,
    verticalListItemAnimation
  ]
})
export class TransitionManagerComponent implements OnInit {

  @Input() transitionsList: AnimationTransition[]
  @Input() readonly statesMap: Map<String, AnimationState>

  constructor(private animationService: AnimationService) { }

  ngOnInit(): void {
  }

  playAnimation(transit: AnimationTransition) {
    this.animationService.playTransition(transit, this.statesMap.get(transit.targetState))
  }

  playDisabled(transit: AnimationTransition): boolean {
    return this.animationService.selectedState.name !== transit.sourceState
  }

}
