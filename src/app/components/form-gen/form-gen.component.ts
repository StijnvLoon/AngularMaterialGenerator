import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { MAT_DRAWER_CONTAINER } from '@angular/material/sidenav/drawer';
import { AddFormTypeDialog } from 'src/app/dialogs/addFormTypeDialog/add-formtype-dialog';
import { FormType } from 'src/app/models/formType';
import { FormTemplate } from '../../models/FormTemplate';

@Component({
  selector: 'app-form-gen',
  templateUrl: './form-gen.component.html',
  styleUrls: ['./form-gen.component.scss']
})
export class FormGenComponent implements OnInit {
  @ViewChild('drawer') sidenav: MatSidenav;

  public formTemplate: FormTemplate
  public edittedFormType: FormType

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.formTemplate = new FormTemplate('new template')
    this.formTemplate.formTypeList.push(FormType.INPUT_TEXT)
    this.formTemplate.formTypeList.push(FormType.INPUT_PASSWORD)
  }

  addFormObjectDialog() {
    const dialogRef = this.dialog.open(AddFormTypeDialog, {
      width: '800px',
      data: {
        title: 'Add Form Item'
      }
    });

    dialogRef.afterClosed().subscribe(async formType => {
      if (formType) {
        this.formTemplate.formTypeList.push(formType)
      }
    })
  }

  setEdittedFormType(formType: FormType) {
    this.edittedFormType = formType
    if(!this.sidenav.opened) {
      this.sidenav.toggle()
    }
  }
}