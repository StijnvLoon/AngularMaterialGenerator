import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { verticalListAnimation, verticalListItemAnimation } from 'src/app/animations/vert-list';
import { AnimationStateDialog } from '../../../dialogs/AnimationStateDialog/animation-state.dialog';
import { AnimationState } from '../../../models/AnimationState';
import { AnimationService } from '../../../services/animation.service';
import { JSONLib }from 'src/assets/jsonLibrary';

@Component({
  selector: 'app-state-manager',
  templateUrl: './state-manager.component.html',
  styleUrls: ['./state-manager.component.scss'],
  animations: [
    verticalListAnimation,
    verticalListItemAnimation
  ]
})
export class StateManagerComponent implements OnInit {

  @Input() statesMap: Map<String, AnimationState>

  constructor(
    private animationService: AnimationService,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
  }

  onStateSelect(state: AnimationState) {
    this.animationService.selectedState = state
  }

  removeCurrentState() {
    this.statesMap.delete(this.animationService.selectedState.name)
    this.animationService.selectedState = this.getStateList()[0]
  }

  editCurrentState() {
    const currentStateCopy: AnimationState = JSONLib.deepCopy(this.animationService.selectedState)

    const dialogRef = this.dialog.open(AnimationStateDialog, {
      width: '80%',
      data: {
        title: 'Edit state ' + currentStateCopy.name,
        name: currentStateCopy.name,
        values: currentStateCopy.cssValues,
        stateNames: Array.from(this.statesMap.keys())
      }
    })

    dialogRef.afterClosed().subscribe(async data => {
      if (data) {
        this.animationService.selectedState.name = data.name
        this.animationService.selectedState.cssValues = data.values
      }
    })
  }

  addNewState() {
    const state: AnimationState = new AnimationState(
      'New state', 
      JSONLib.deepCopy(this.animationService.selectedState.cssValues)
    )

    const dialogRef = this.dialog.open(AnimationStateDialog, {
      width: '80%',
      data: {
        title: 'New state',
        name: state.name,
        values: state.cssValues,
        stateNames: Array.from(this.statesMap.keys())
      }
    })

    dialogRef.afterClosed().subscribe(async data => {
      if (data) {
        const newState = new AnimationState(data.name, data.values)
        this.statesMap.set(newState.name, newState)
        this.animationService.selectedState = newState
      }
    })
  }

  getStateList(): AnimationState[] {
    return Array.from(this.statesMap.values())
  }

}
