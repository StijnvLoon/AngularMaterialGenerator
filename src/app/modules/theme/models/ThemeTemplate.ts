import { ThemePalette } from "./ThemePalette";

export class ThemeTemplate {

    constructor(
        public name: string,
        public primaryPalette: ThemePalette,
        public accentPalette: ThemePalette,
        public warnPalette: ThemePalette,
        public dark?: boolean
    ) {
        if(dark == undefined) {
            dark = false
        }
    }
}