import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { SelectFormTemplateDialog } from 'src/app/dialogs/selectFormTemplateDialog/select-formtemplate-dialog';
import { ThemeSheet } from 'src/app/sheets/theme-sheet/theme-sheet';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {

  constructor(private dialog: MatDialog, private sheet: MatBottomSheet) { }

  ngOnInit(): void {
  }

  selectFormTemplateDialog() {
    const dialogRef = this.dialog.open(SelectFormTemplateDialog, {
      width: '800px'
    });
  }

  openThemeSheet() {
    this.sheet.open(ThemeSheet);
  }

}


