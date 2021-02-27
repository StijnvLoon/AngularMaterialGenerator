import { Injectable } from '@angular/core';
import { ThemeColor } from '../models/ThemeColor';
import { ThemePalette } from '../models/ThemePalette';
declare function require(name:string);
var tinycolor = require("tinycolor2");

@Injectable({
    providedIn: 'root'
})
export class ThemePaletteService {

    public systemColors: ThemeColor[] = [
        new ThemeColor('$mat-red', '#F44236'),
        new ThemeColor('$mat-pink', '#EA1E63'),
        new ThemeColor('$mat-purple', '#9C28AF'),
        new ThemeColor('$mat-deep-purple', '#673BB7'),
        new ThemeColor('$mat-indigo', '#3F51B5'),
        new ThemeColor('$mat-blue', '#2196F3'),
        new ThemeColor('$mat-light-blue', '#03A9F3'),
        new ThemeColor('$mat-cyan', '#00BCD5'),
        new ThemeColor('$mat-teal', '#009788'),
        new ThemeColor('$mat-green', '#4CAF52'),
        new ThemeColor('$mat-light-green', '#8BC24A'),
        new ThemeColor('$mat-lime', '#CDDC39'),
        new ThemeColor('$mat-yellow', '#FFEA3C'),
        new ThemeColor('$mat-amber', '#FEC107'),
        new ThemeColor('$mat-orange', '#FF9700'),
        new ThemeColor('$mat-deep-orange', '#FE5722'),
        new ThemeColor('$mat-brown', '#795549'),
        new ThemeColor('$mat-grey', '#9E9E9E'),
        new ThemeColor('$mat-blue-grey', '#607D8B'),
        new ThemeColor('$mat-black', '#000000'),
        new ThemeColor('$mat-white', '#FFFFFF')
    ]

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

    private multiply(rgb1, rgb2) {
        rgb1.b = Math.floor(rgb1.b * rgb2.b / 255);
        rgb1.g = Math.floor(rgb1.g * rgb2.g / 255);
        rgb1.r = Math.floor(rgb1.r * rgb2.r / 255);
        return tinycolor('rgb ' + rgb1.r + ' ' + rgb1.g + ' ' + rgb1.b);
    };

    private getThemeColor(value, name): ThemeColor {
        var c = tinycolor(value);

        return new ThemeColor(
            name,
            c.toHexString(),
            c.isLight()
        )
    }

}