import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { AddFormTypeDialog } from 'src/app/dialogs/addFormTypeDialog/add-formtype-dialog';
import { ConfirmDialog } from 'src/app/dialogs/confirmDialog/confirm-dialog';
import { FormTemplate } from 'src/app/models/formTemplate';
import { FormType } from 'src/app/models/formType';
import { FormTypeService } from 'src/app/services/form-type.service';
import { verticalListAnimation, verticalListItemAnimation } from 'src/app/animations/vert-list';
import { FormTypeKey } from 'src/app/models/enums/FormTypeKey';

@Component({
  selector: 'app-form-editor',
  templateUrl: './form-editor.component.html',
  styleUrls: ['./form-editor.component.scss'],
  animations: [verticalListAnimation, verticalListItemAnimation]
})
export class FormEditorComponent implements OnInit {
  @ViewChild('drawer') sidenav: MatSidenav;

  @Input() formTemplate: FormTemplate
  public edittedFormType: FormType
  public tabIsActive: boolean = true

  constructor(private dialog: MatDialog, private formTypeService: FormTypeService) { }

  ngOnInit(): void {
  }

  addFormObjectDialog() {
    const dialogRef = this.dialog.open(AddFormTypeDialog, {
      width: '800px',
      data: {
        title: 'Add form component'
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

  removeFormType(formType: FormType) {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '800px',
      data: {
        title: 'Are you sure you want to remove this form component?'
      }
    });

    dialogRef.afterClosed().subscribe(async bool => {
      if (bool) {
        this.formTemplate.formTypeList.splice(this.formTemplate.formTypeList.indexOf(formType), 1)
      }
    })

  }

  closeOptions() {
    this.sidenav.close()
    this.edittedFormType = undefined
  }

}
