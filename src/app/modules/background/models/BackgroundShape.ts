export class BackgroundShape {

    constructor(
        public shape: Shape = Shape.Rectangle,
        public name: string = 'black square',
        public y: number = 0,
        public x: number = 0,
        public width: number = 200,
        public height: number = 200,
        public color: string = '#000000',
        public shadowLvl: string = 'z0',
        public rotation: number = 0,
        public opacity: number = 100
    ) { }
}

export enum Shape {
    Rectangle,
    Triangle,
    Circle
}