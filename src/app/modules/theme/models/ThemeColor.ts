export class ThemeColor {

    public darkContrast: boolean

    constructor(
        public name: string,
        public hex: string,
        darkConstrast?: boolean) {
        this.darkContrast = darkConstrast
    }
}