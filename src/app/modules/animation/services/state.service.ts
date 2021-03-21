import { Injectable } from '@angular/core';
import { AnimationState } from '../models/AnimationState';

@Injectable({
  providedIn: 'root'
})
export class StateService {

    selectedState: AnimationState

}