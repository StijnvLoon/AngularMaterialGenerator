import { Component, Input, OnInit } from '@angular/core';
import { AnimationState } from '../../../models/AnimationState';
import { StateService } from '../../../services/state.service';

@Component({
  selector: 'app-state-manager',
  templateUrl: './state-manager.component.html',
  styleUrls: ['./state-manager.component.scss']
})
export class StateManagerComponent implements OnInit {

  @Input() statesMap: Map<String, AnimationState>

  constructor(private stateService: StateService) { }

  ngOnInit(): void {
  }

  onStateSelect(state: AnimationState) {
    this.stateService.selectedState = state
  }

}
