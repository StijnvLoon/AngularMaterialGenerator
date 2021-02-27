import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { verticalListAnimation, verticalListItemAnimation } from 'src/app/animations/vert-list';
import { ThemeTemplate } from 'src/app/modules/theme/models/ThemeTemplate';
import { ThemeService } from 'src/app/services/theme.service';

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
            this.userThemeTemplates = this.themeService.userThemeTemplates.splice(1, 1)
    }

    submit(themeTemplate: ThemeTemplate, isZeroIndex?: boolean) {
        if (isZeroIndex) {
          this.themeService.saveThemeTemplate(themeTemplate, true)
          this.router.navigate(['/themes/0'])
        } else {
          this.router.navigate(['/themes/' + this.themeService.userThemeTemplates.indexOf(themeTemplate)])
        }

        this.close()
    }

    close(): void {
        this.dialogRef.close();
    }

    trackByIndex(index, item) {
        return index;
    }

    deleteTemplate(index: number) {
        // const dialogRef = this.dialog.open(ConfirmDialog, {
        //   width: '800px',
        //   data: {
        //     title: 'Are you sure you want to remove this formtemplate?'
        //   }
        // });

        // dialogRef.afterClosed().subscribe(async bool => {
        //   if (bool) {
        //     this.localStorage.deleteFormTemplate(index)
        //   }
        // })
    }
}