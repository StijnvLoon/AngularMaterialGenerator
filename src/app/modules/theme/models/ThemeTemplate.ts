import { ThemePalette } from "@angular/material/core";

export class ThemeTemplate {

    constructor(
        public name: string,
        public primary: ThemePalette,
        public accent: ThemePalette,
        public warn: ThemePalette,
        public dark?: boolean
    ) {
        if(dark == undefined) {
            dark = false
        }
    }
}