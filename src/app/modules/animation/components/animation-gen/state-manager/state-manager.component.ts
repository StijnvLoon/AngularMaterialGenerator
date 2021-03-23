import { Component, Input, OnInit } from '@angular/core';
import { verticalListAnimation, verticalListItemAnimation } from 'src/app/animations/vert-list';
import { AnimationState } from '../../../models/AnimationState';
import { StateService } from '../../../services/state.service';

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

  constructor(private stateService: StateService) { }

  ngOnInit(): void {
  }

  onStateSelect(state: AnimationState) {
    this.stateService.selectedState = state
  }

  removeCurrentState() {
    this.statesMap.delete(this.stateService.selectedState.name)
    this.stateService.selectedState = this.getStateList()[0]
  }

  getStateList(): AnimationState[] {
    return Array.from(this.statesMap.values())
  }

}
