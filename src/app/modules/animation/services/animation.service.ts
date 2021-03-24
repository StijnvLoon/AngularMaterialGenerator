import { Injectable } from '@angular/core';
import { AnimationState } from '../models/AnimationState';
import { AnimationTransition } from '../models/AnimationTransition';

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
        animatedState.values = this.combineMaps([
            new Map([["transition", this.transitionToString(transit)]]),
            targetState.values
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

    mapToJson(map: Map<string, string>) {
        var string = '{'

        var index = 0
        var lastIndex = map.size - 1

        map.forEach((value, key) => {
            if (index == lastIndex) {
                string = string.concat('\"' + key + '\":\"' + value + '\"')
            } else {
                string = string.concat('\"' + key + '\":\"' + value + '\",')
            }
            index++
        });

        string = string.concat('}')
        return JSON.parse(string)
    }

    private combineMaps(maps: Map<string, string>[]): Map<string, string> {
        const newMap: Map<string, string> = new Map()

        maps.forEach(map => {
            map.forEach((value, key) => {
                newMap.set(key, value)
            })
        })

        return newMap
    }

    private transitionToString(transit: AnimationTransition): string {
        return transit.animation.targetCSS + ' ' + transit.animation.duration + 'ms ' + transit.animation.easingFunction
    }

}