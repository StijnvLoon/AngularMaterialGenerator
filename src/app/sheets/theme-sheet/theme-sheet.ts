import { Component, OnInit } from "@angular/core";
import { MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { ITheme, ThemeService } from "src/app/services/theme.service";

@Component({
    selector: 'theme-sheet',
    templateUrl: './theme-sheet.html',
    styleUrls: ['./theme-sheet.scss'],
})
export class ThemeSheet implements OnInit {

    public themes: ITheme[]

    constructor(private _bottomSheetRef: MatBottomSheetRef<ThemeSheet>, public themeService: ThemeService) {
        this.themes = this.themeService.getAvailableThemes()
    }

    ngOnInit() {

    }

    setTheme(theme: string) {
        this.themeService.setThemeClass(theme)
        this._bottomSheetRef.dismiss();
    }
}