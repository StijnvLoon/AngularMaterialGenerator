import { Injectable } from '@angular/core';
import { ThemeColor } from '../models/ThemeColor';
import { ThemePalette } from '../models/ThemePalette';
declare function require(name:string);
var tinycolor = require("tinycolor2");

@Injectable({
    providedIn: 'root'
})
export class ThemePaletteService {

    constructor() {

    }

    generatePallete(name: string, hex: string): ThemePalette {
        var baseLight = tinycolor('#ffffff');
        var baseDark = this.multiply(tinycolor(hex).toRgb(), tinycolor(hex).toRgb());
        var baseTriad = tinycolor(hex).tetrad();
        return new ThemePalette(
            name,
            [
                this.getThemeColor(tinycolor.mix(baseLight, hex, 12), '50'),
                this.getThemeColor(tinycolor.mix(baseLight, hex, 30), '100'),
                this.getThemeColor(tinycolor.mix(baseLight, hex, 50), '200'),
                this.getThemeColor(tinycolor.mix(baseLight, hex, 70), '300'),
                this.getThemeColor(tinycolor.mix(baseLight, hex, 85), '400'),
                this.getThemeColor(tinycolor.mix(baseLight, hex, 100), '500'),
                this.getThemeColor(tinycolor.mix(baseDark, hex, 87), '600'),
                this.getThemeColor(tinycolor.mix(baseDark, hex, 70), '700'),
                this.getThemeColor(tinycolor.mix(baseDark, hex, 54), '800'),
                this.getThemeColor(tinycolor.mix(baseDark, hex, 25), '900'),
                this.getThemeColor(tinycolor.mix(baseDark, baseTriad[4], 15).saturate(80).lighten(65), 'A100'),
                this.getThemeColor(tinycolor.mix(baseDark, baseTriad[4], 15).saturate(80).lighten(55), 'A200'),
                this.getThemeColor(tinycolor.mix(baseDark, baseTriad[4], 15).saturate(100).lighten(45), 'A400'),
                this.getThemeColor(tinycolor.mix(baseDark, baseTriad[4], 15).saturate(100).lighten(40), 'A700')
            ]
        )
    }

    multiply(rgb1, rgb2) {
        rgb1.b = Math.floor(rgb1.b * rgb2.b / 255);
        rgb1.g = Math.floor(rgb1.g * rgb2.g / 255);
        rgb1.r = Math.floor(rgb1.r * rgb2.r / 255);
        return tinycolor('rgb ' + rgb1.r + ' ' + rgb1.g + ' ' + rgb1.b);
    };

    getThemeColor(value, name): ThemeColor {
        var c = tinycolor(value);

        return new ThemeColor(
            name,
            c.toHexString(),
            c.isLight()
        )
    }

}