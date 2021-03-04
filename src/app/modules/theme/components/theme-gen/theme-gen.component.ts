import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TextDialog } from 'src/app/dialogs/textDialog/text-dialog';
import { NotificationService } from 'src/app/services/notification.service';
import { ThemeService } from 'src/app/services/theme.service';
import { ThemeSheet } from 'src/app/sheets/theme-sheet/theme-sheet';
import { ThemeTemplate } from '../../models/ThemeTemplate';

@Component({
  selector: 'app-theme-gen',
  templateUrl: './theme-gen.component.html',
  styleUrls: ['./theme-gen.component.scss']
})
export class ThemeGenComponent implements OnInit {

  public themeTemplate: ThemeTemplate

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private themeService: ThemeService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private sheet: MatBottomSheet
    ) { }

  ngOnInit(): void {
    let id: string = this.route.snapshot.paramMap.get('id')
    let idNumber: number = +id

    this.themeTemplate = this.themeService.getThemeTemplateByIndex(idNumber, onError => {
      console.log('no template found with this index!')
    })
  }

  setTheme() {
    this.themeService.setTheme(this.themeTemplate)
  }

  openThemeSheet() {
    this.sheet.open(ThemeSheet);
  }

  editNameDialog() {
    const nameCopy: string = this.themeTemplate.name
    const dialogRef = this.dialog.open(TextDialog, {
      width: '600px',
      data: {
        title: 'Change template name',
        text: nameCopy
      }
    });

    dialogRef.afterClosed().subscribe(async name => {
      if (name) {
        this.themeTemplate.name = name
      }
    })
  }

  saveTemplate() {
    let id: string = this.route.snapshot.paramMap.get('id')
    let idNumber: number = +id

    if(idNumber == 0) {
      const newIndex: number = this.themeService.saveThemeTemplate(this.themeTemplate)
      this.router.navigate(['/themes/' + newIndex])
      this.notificationService.notify("New template saved on index: " + idNumber+1)
    } else {
      this.themeService.updateThemeTemplate(this.themeTemplate, idNumber)
      this.notificationService.notify("Template updated")
    }
  }

}
