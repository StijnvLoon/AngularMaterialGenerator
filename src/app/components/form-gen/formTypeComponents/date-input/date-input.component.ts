import { trigger, state, style, transition, animate } from '@angular/animations';
import { AfterViewInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from 'src/app/dialogs/confirmDialog/confirm-dialog';
import { FormType, FormTypeImport, FormTypeOptions } from 'src/app/models/formType';
import { ImportsLibrary } from 'src/app/models/importsLibrary';
import { FormTypeService } from 'src/app/services/form-type.service';
import { IFormType } from '../IformType';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss'],
  animations: [
    trigger('verticalListAnimation', [
      state('close', style({
        opacity: 0,
        height: '0px'
      })),
      state('open', style({
        opacity: 1,
        height: '*'
      })),
      transition('close => open', animate('0.3s ease')),
      transition('open => close', animate('0.3s ease'))
    ])
  ]
})
export class DateInputComponent implements IFormType, AfterViewInit {
  @ViewChild('picker') picker: MatDatepicker<[]>;

  @Input() public options: FormTypeOptions
  @Input() public showPreview: boolean = false;
  @Output() onRemove = new EventEmitter();
  @Output() onToggleEdit = new EventEmitter<FormTypeOptions>();
  
  public animState: string = 'close';
  public date: Date

  constructor(private dialog: MatDialog, public formTypeService: FormTypeService) { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.animState = 'open'
    });
  }

  remove() {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '800px',
      data: {
        title: 'Are you sure you want to remove this form component?'
      }
    });

    dialogRef.afterClosed().subscribe(async bool => {
      if (bool) {
        this.animState = 'close'
        setTimeout(() => {
          this.onRemove.emit()
        }, 300);
      }
    })
  }

  toggleEdit() {
    this.onToggleEdit.emit(this.options)
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
