import { Component, OnInit } from "@angular/core";
import { MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { ThemeTemplate } from "src/app/modules/theme/models/ThemeTemplate";
import { ThemeService } from "src/app/services/theme.service";

@Component({
    selector: 'theme-sheet',
    templateUrl: './theme-sheet.html',
    styleUrls: ['./theme-sheet.scss'],
})
export class ThemeSheet implements OnInit {

    constructor(
        private _bottomSheetRef: MatBottomSheetRef<ThemeSheet>,
        public themeService: ThemeService
    ) {
    }

    ngOnInit() {

    }

    setTheme(theme: ThemeTemplate) {
        this.themeService.setTheme(theme)
        this._bottomSheetRef.dismiss();
    }
}