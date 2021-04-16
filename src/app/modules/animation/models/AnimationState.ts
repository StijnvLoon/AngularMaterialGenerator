import { CssValue } from "./CssValue";

export class AnimationState {

    constructor(
        public name: string,
        public cssValues: CssValue[] = []
    ) { }
}