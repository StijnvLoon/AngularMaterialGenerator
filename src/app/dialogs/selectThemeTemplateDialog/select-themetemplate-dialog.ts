import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { verticalListAnimation, verticalListItemAnimation } from 'src/app/animations/vert-list';
import { ThemeTemplate } from 'src/app/modules/theme/models/ThemeTemplate';
import { ThemeService } from 'src/app/services/theme.service';
import { ConfirmDialog } from '../confirmDialog/confirm-dialog';

@Component({
    selector: 'select-themetemplate-dialog',
    templateUrl: './select-themetemplate-dialog.html',
    styleUrls: ['./select-themetemplate-dialog.scss'],
    animations: [
        verticalListAnimation,
        verticalListItemAnimation
    ]
})
export class SelectThemeTemplateDialog {

    userThemeTemplates: ThemeTemplate[]

    constructor(
        public dialogRef: MatDialogRef<SelectThemeTemplateDialog>,
        private router: Router,
        private dialog: MatDialog,
        public themeService: ThemeService) {
        this.userThemeTemplates = this.themeService.getUserThemeTemplatesCopy()
    }

    submit(themeTemplate: ThemeTemplate, isZeroIndex?: boolean) {
        if (isZeroIndex) {
            const themeCopy = JSON.parse(JSON.stringify(themeTemplate))
            this.themeService.saveThemeTemplate(themeCopy, true)
            this.router.navigate(['/themes/0'])
        } else {
            this.router.navigate(['/themes/' + (this.userThemeTemplates.indexOf(themeTemplate)+1)])
        }

        this.close()
    }

    close(): void {
        this.dialogRef.close();
    }

    trackByIndex(index, item) {
        return index;
    }

    deleteTheme(theme: ThemeTemplate){
        const dialogRef = this.dialog.open(ConfirmDialog, {
          width: '800px',
          data: {
            title: 'Are you sure you want to remove this theme template?'
          }
        });

        dialogRef.afterClosed().subscribe(async bool => {
          if (bool) {
              const index = this.userThemeTemplates.indexOf(theme)
              this.userThemeTemplates.splice(index, 1)
              this.themeService.deleteThemeTemplate(index + 1)
          }
        })
    }
}