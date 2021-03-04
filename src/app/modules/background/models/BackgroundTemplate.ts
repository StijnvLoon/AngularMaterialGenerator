import { BackgroundRatio } from "./BackgroundRatio";
import { BackgroundShape } from "./BackgroundShape";

export class BackgroundTemplate {

    constructor(
        public name: string,
        public ratio: BackgroundRatio,
        public shapes: BackgroundShape[]
    ) { }
}