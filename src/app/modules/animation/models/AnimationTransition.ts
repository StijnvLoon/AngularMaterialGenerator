export class AnimationTransition {

    constructor(
        public sourceState: string,
        public targetState: string,
        public animation: TransitionValues = new TransitionValues()
    ) { }
}

export class TransitionValues {

    constructor(
        public duration: number = 500,
        public targetCSS: string = 'all',
        public easingFunction: string = 'ease'
    ) { }
}