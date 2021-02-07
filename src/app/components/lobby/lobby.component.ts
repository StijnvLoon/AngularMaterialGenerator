import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormComponentLibrary } from 'dist/AMG/assets/formComponentLibrary';
import { AddFormTypeDialog } from 'src/app/dialogs/addFormTypeDialog/add-formtype-dialog';
import { SelectFormTemplateDialog } from 'src/app/dialogs/selectFormTemplateDialog/select-formtemplate-dialog';
import { FormOptions } from 'src/app/models/FormOptions';
import { FormSavable } from 'src/app/models/FormSavable';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  selectFormTemplateDialog() {
    const dialogRef = this.dialog.open(SelectFormTemplateDialog, {
      width: '800px'
    });
  }

}
