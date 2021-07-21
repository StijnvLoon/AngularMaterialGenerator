import { AfterViewInit, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { SidenavService } from 'src/app/modules/form/services/sidenav.service';
import { FormCategoryLibrary } from 'src/assets/formComponentCategoryLibrary';
import { ImportsLibrary } from 'src/assets/importsLibrary';
import { FormTypeConcrete } from '../FormTypeConcrete';
import { IFormType } from '../IformType';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss', '../typeGeneral.scss']
})
export class DateInputComponent extends FormTypeConcrete implements IFormType, AfterViewInit {
  @ViewChild('picker') picker: MatDatepicker<[]>;

  public readonly category: FormCategoryLibrary = FormCategoryLibrary.INPUT
  public date: Date

  constructor(public dialog: MatDialog, public sidenavService: SidenavService) {
    super(dialog)
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.animState = 'open'
    });

    if (this.options.editableText == undefined) {
      this.options.editableText = false
    }
  }

  openPicker() {
    if (!this.options.editableText) {
      this.picker.open()
    }
  }

  getHTMLCodeCallback() {
    return () => {
      const controlName = this.options.modelName.toLowerCase().replace(/\s/g, "_") + 'Control'

      return [
        '    <mat-form-field>',
        '        <mat-label>' + this.options.modelName + '</mat-label>',
        '        <input matInput [matDatepicker]="picker" formControlName="' + controlName + '>',
        '        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>',
        '        <mat-datepicker #picker disabled="false"></mat-datepicker>',
        '    </mat-form-field>'
      ]
    }
  }

  getTSCodeCallback() {
    return () => {
      return []
    }
  }

  getCssCodeCallback() {
    return () => {
      return []
    }
  }

  getFormControlCallback() {
    return () => {
      if(this.options.editableText) {
        return ['    ' + this.options.modelName.toLowerCase().replace(/\s/g, "_") + 'Control: new FormControl(\'\'),']
      } else {
        return ['    ' + this.options.modelName.toLowerCase().replace(/\s/g, "_") + 'Control: new FormControl({ value: \'\', disabled=\'true\'}),']
      }
    }
  }

  getImportsCallback() {
    return () => {
      return [
        ImportsLibrary.MATINPUTMODULE,
        ImportsLibrary.MATICONMODULE,
        ImportsLibrary.MATNATIVEDATEMODULE,
        ImportsLibrary.MATDATEPICKERMODULE
      ]
    }
  }
}
