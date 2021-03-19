import { AnimationTransition } from "./AnimationTransition";
import { AnimationState } from "./AnimationState";

export class AnimationTemplate {

    constructor(
        public name: string = 'test',
        public statesMap: Map<String, AnimationState> = new Map(),
        public animations: AnimationTransition[] = []
    ) { }
}