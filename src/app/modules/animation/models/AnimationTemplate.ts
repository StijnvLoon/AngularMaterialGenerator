import { AnimationTransition } from "./AnimationTransition";
import { AnimationState } from "./AnimationState";

export class AnimationTemplate {

    constructor(
        public name: string = 'test',
        public statesMap: Map<string, AnimationState> = new Map(),
        public transitionsList: AnimationTransition[] = []
    ) { }
}