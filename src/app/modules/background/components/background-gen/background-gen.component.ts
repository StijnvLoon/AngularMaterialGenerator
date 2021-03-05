import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { ThemeSheet } from 'src/app/sheets/theme-sheet/theme-sheet';
import { EditBackgroundTemplateDialog } from '../../dialogs/editBackgroundTemplateDialog/editbackgroundtemplate-dialog';
import { ExportImageDialog } from '../../dialogs/exportImageDalog/exportImage-dialog';
import { BackgroundRatio } from '../../models/BackgroundRatio';
import { BackgroundShape } from '../../models/BackgroundShape';
import { BackgroundTemplate } from '../../models/backgroundtemplate';

@Component({
  selector: 'app-background-gen',
  templateUrl: './background-gen.component.html',
  styleUrls: ['./background-gen.component.scss']
})
export class BackgroundGenComponent implements OnInit {

  backgroundTemplate: BackgroundTemplate

  constructor(private sheet: MatBottomSheet, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.backgroundTemplate = new BackgroundTemplate('test', '#ffffff', new BackgroundRatio(16, 9), [new BackgroundShape()])
  }

  openThemeSheet() {
    this.sheet.open(ThemeSheet);
  }

  editBackgroundTemplateDialog() {
    const dialogRef = this.dialog.open(EditBackgroundTemplateDialog, {
      width: '600px',
      data: {
        title: 'Change background data',
        name: this.backgroundTemplate.name,
        widthRatio: this.backgroundTemplate.ratio.width,
        heightRatio: this.backgroundTemplate.ratio.height,
        backgroundColor: this.backgroundTemplate.backgroundColor
      }
    });

    dialogRef.afterClosed().subscribe(async data => {
      if (data) {
        this.backgroundTemplate.name = data.nameControl
        this.backgroundTemplate.ratio.width = data.width_ratioControl
        this.backgroundTemplate.ratio.height = data.height_ratioControl
        this.backgroundTemplate.backgroundColor = data.background_colorControl
      }
    })
  }

  export() {

    const dialogRef = this.dialog.open(ExportImageDialog, {
      width: '600px',
      data: {
        title: 'Export background',
        templateName: this.backgroundTemplate.name
      }
    });
  }

}
