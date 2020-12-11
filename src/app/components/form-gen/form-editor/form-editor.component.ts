import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { AddFormTypeDialog } from 'src/app/dialogs/addFormTypeDialog/add-formtype-dialog';
import { FormTemplate } from 'src/app/models/formTemplate';
import { FormType } from 'src/app/models/formType';
import { FormTypeService } from 'src/app/services/form-type.service';

@Component({
  selector: 'app-form-editor',
  templateUrl: './form-editor.component.html',
  styleUrls: ['./form-editor.component.scss']
})
export class FormEditorComponent implements OnInit {
  @ViewChild('drawer') sidenav: MatSidenav;

  @Input() formTemplate: FormTemplate
  public edittedFormType: FormType

  constructor(private dialog: MatDialog, private formTypeService: FormTypeService) { }

  ngOnInit(): void {
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
        this.formTemplate.formTypeList.push(this.formTypeService.createFormType(formType.key))
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
