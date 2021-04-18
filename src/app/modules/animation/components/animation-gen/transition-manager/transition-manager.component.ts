import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { verticalListAnimation, verticalListItemAnimation } from 'src/app/animations/vert-list';
import { JSONLib } from 'src/assets/jsonLibrary';
import { AnimationTransitionDialog } from '../../../dialogs/AnimationTransitionDialog/animation-transition.dialog';
import { AnimationState } from '../../../models/AnimationState';
import { AnimationTransition, TransitionValues } from '../../../models/AnimationTransition';
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

  constructor(
    private animationService: AnimationService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  playAnimation(transit: AnimationTransition) {
    this.animationService.playTransition(transit, this.statesMap.get(transit.targetState))
  }

  playDisabled(transit: AnimationTransition): boolean {
    return this.animationService.selectedState.name !== transit.sourceState
  }

  editTransition(transit: AnimationTransition) {
    const dialogRef = this.dialog.open(AnimationTransitionDialog, {
      maxWidth: '800px',
      width: '80%',
      data: {
        title: 'Edit transition',
        sourceStateName: transit.sourceState,
        targetStateName: transit.targetState,
        transitionValues: JSONLib.deepCopyObject(transit.animation),
        availableStateNames: Array.from(this.statesMap.keys())
      }
    })

    dialogRef.afterClosed().subscribe(async data => {
      if (data) {
        transit.sourceState = data.sourceStateControl
        transit.targetState = data.targetStateControl
        transit.animation = new TransitionValues(
          data.durationControl,
          data.targetCssControl,
          data.easingFunctionControl
        )
      }
    })
  }

  newTransition() {
    const dialogRef = this.dialog.open(AnimationTransitionDialog, {
      maxWidth: '800px',
      width: '80%',
      data: {
        title: 'New transition',
        sourceStateName: '',
        targetStateName: '',
        transitionValues: new TransitionValues,
        availableStateNames: Array.from(this.statesMap.keys())
      }
    })

    dialogRef.afterClosed().subscribe(async data => {
      if (data) {
        this.transitionsList.push(new AnimationTransition(
          data.sourceStateControl,
          data.targetStateControl,
          new TransitionValues(
            data.durationControl,
            data.targetCssControl,
            data.easingFunctionControl
          )
        ))
      }
    })
  }

  removeTransition(transit: AnimationTransition) {
    this.transitionsList.splice(this.transitionsList.indexOf(transit), 1)
  }

}
