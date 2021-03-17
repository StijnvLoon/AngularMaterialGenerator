import { AnimationAnim } from "./AnimationAnim";
import { AnimationState } from "./AnimationState";

export class AnimationTemplate {

    constructor(
        public name: string = 'test',
        public statesMap: Map<String, AnimationState> = new Map(),
        public animations: AnimationAnim[] = []
    ) { }
}