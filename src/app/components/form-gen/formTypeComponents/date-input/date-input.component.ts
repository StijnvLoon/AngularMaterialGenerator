import { ViewChild } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { FormType, FormTypeImport, FormTypeOptions } from 'src/app/models/formType';
import { ImportsLibrary } from 'src/app/models/importsLibrary';
import { IFormType } from '../IformType';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss']
})
export class DateInputComponent implements OnInit, IFormType {
  @ViewChild('picker') picker: MatDatepicker<[]>;

  //modelName
  @Input() public options: FormTypeOptions

  public date: Date

  constructor() { }

  ngOnInit(): void {
  }

  openPicker() {
    if (!this.options.editableText) {
      this.picker.open()
    }
  }

  getHTMLCode(formType?: FormType): string[] {
    const controlName = formType.options.modelName.toLowerCase().replace(/\s/g, "_") + 'Control'

      if (formType.options.editableText) {
        return [
          '    <mat-form-field>',
          '        <mat-label>' + formType.options.modelName + '</mat-label>',
          '        <input matInput [matDatepicker]="picker" formControlName="' + controlName + '>',
          '        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>',
          '        <mat-datepicker #picker disabled="false"></mat-datepicker>',
          '    </mat-form-field>'
        ]
      } else {
        return [
          '    <mat-form-field (click)="picker.open()">',
          '        <mat-label>' + formType.options.modelName + '</mat-label>',
          '        <input matInput [matDatepicker]="picker" formControlName="' + controlName + '" disabled>',
          '        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>',
          '        <mat-datepicker #picker disabled="false"></mat-datepicker>',
          '    </mat-form-field>'
        ]
      }
  }

  getImports(): FormTypeImport[] {
    return [
      ImportsLibrary.MATINPUTMODULE,
      ImportsLibrary.MATICONMODULE,
      ImportsLibrary.MATNATIVEDATEMODULE,
      ImportsLibrary.MATDATEPICKERMODULE
    ]
  }
}
