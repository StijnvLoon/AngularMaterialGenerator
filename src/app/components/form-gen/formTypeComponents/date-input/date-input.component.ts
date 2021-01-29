import { trigger, state, style, transition, animate } from '@angular/animations';
import { AfterViewInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { formTypeAnimation } from 'src/app/animations/formTypeAnim';
import { ConfirmDialog } from 'src/app/dialogs/confirmDialog/confirm-dialog';
import { FormOptions } from 'src/app/models/FormOptions';
import { SidenavService } from 'src/app/services/sidenav.service';
import { FormCategoryLibrary } from 'src/assets/formComponentCategoryLibrary';
import { ImportsLibrary } from 'src/assets/importsLibrary';
import { IFormType } from '../IformType';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss', '../typeGeneral.scss'],
  animations: [formTypeAnimation]
})
export class DateInputComponent implements IFormType, AfterViewInit {
  @ViewChild('picker') picker: MatDatepicker<[]>;

  public readonly category: FormCategoryLibrary = FormCategoryLibrary.INPUT
  public options: FormOptions
  public showPreview: boolean = false;
  @Output() onRemove = new EventEmitter();
  @Output() onToggleEdit = new EventEmitter<FormOptions>();

  public animState: string = 'close';
  public date: Date

  constructor(private dialog: MatDialog, public sidenavService: SidenavService) { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.animState = 'open'
    });

    if(this.options.editableText == undefined) {
      this.options.editableText = false
    }
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

  getHTMLCodeCallback() {
    return () => {
      const controlName = this.options.modelName.toLowerCase().replace(/\s/g, "_") + 'Control'

      if (this.options.editableText) {
        return [
          '    <mat-form-field>',
          '        <mat-label>' + this.options.modelName + '</mat-label>',
          '        <input matInput [matDatepicker]="picker" formControlName="' + controlName + '>',
          '        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>',
          '        <mat-datepicker #picker disabled="false"></mat-datepicker>',
          '    </mat-form-field>'
        ]
      } else {
        return [
          '    <mat-form-field (click)="picker.open()">',
          '        <mat-label>' + this.options.modelName + '</mat-label>',
          '        <input matInput [matDatepicker]="picker" formControlName="' + controlName + '" disabled>',
          '        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>',
          '        <mat-datepicker #picker disabled="false"></mat-datepicker>',
          '    </mat-form-field>'
        ]
      }
    }
  }

  getTSCodeCallback() {
    return () => {
      return []
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
