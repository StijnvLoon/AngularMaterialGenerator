import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddFormTypeDialog } from 'src/app/dialogs/addFormTypeDialog/add-formtype-dialog';
import { FormTemplate } from '../../models/FormTemplate';

@Component({
  selector: 'app-form-gen',
  templateUrl: './form-gen.component.html',
  styleUrls: ['./form-gen.component.scss']
})
export class FormGenComponent implements OnInit {

  public formTemplate: FormTemplate

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.formTemplate = new FormTemplate('new template')
  }

  addFormObjectDialog() {
    const dialogRef = this.dialog.open(AddFormTypeDialog, {
      width: '800px',
      data: {
        title: 'Add Form Item'
      }
    });

    dialogRef.afterClosed().subscribe(async data => {
      if (data) {
        //this.formTemplate.formTypeList.push(data)
      }
    })
  }
}
