import { Injectable } from '@angular/core';
import { AnimationState } from '../models/AnimationState';
import { AnimationTransition } from '../models/AnimationTransition';
import { CssValue } from '../models/CssValue';

@Injectable({
    providedIn: 'root'
})
export class AnimationService {

    selectedState: AnimationState
    isPlaying: boolean = false

    playTransition(transit: AnimationTransition, targetState: AnimationState) {
        //save previeus state
        const oldState: AnimationState = this.selectedState
        //create new state with animation
        const animatedState: AnimationState = new AnimationState("")
        animatedState.cssValues = targetState.cssValues.concat([
            new CssValue("transition", this.transitionToString(transit))
        ])

        //play the animation by setting new state
        this.isPlaying = true
        this.selectedState = animatedState

        //when finished, reset state to pervieus state
        setTimeout(() => {
            this.selectedState = oldState
            this.isPlaying = false
        }, transit.animation.duration + 500);
    }

    cssValuesToJson(values: CssValue[]): string {
        var string = '{'

        var index = 0
        var lastIndex = values.length - 1

        values.forEach(cssValue => {
            if (index == lastIndex) {
                string = string.concat('\"' + cssValue.key + '\":\"' + cssValue.value + '\"')
            } else {
                string = string.concat('\"' + cssValue.key + '\":\"' + cssValue.value + '\",')
            }
            index++
        })

        string = string.concat('}')
        return JSON.parse(string)
    }

    private transitionToString(transit: AnimationTransition): string {
        return transit.animation.targetCSS + ' ' + transit.animation.duration + 'ms ' + transit.animation.easingFunction
    }

}