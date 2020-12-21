import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormType, FormTypeImport, FormTypeOptions } from 'src/app/models/formType';
import { ImportsLibrary } from 'src/app/models/importsLibrary';
import { IFormType } from '../IformType'
import { verticalListItemAnimation } from 'src/app/animations/vert-list';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from 'src/app/dialogs/confirmDialog/confirm-dialog';
import { FormTypeService } from 'src/app/services/form-type.service';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  animations: [verticalListItemAnimation]
})
export class TextInputComponent implements OnInit, IFormType {

  @Input() public options: FormTypeOptions
  @Output() onRemove = new EventEmitter();
  @Output() onToggleEdit = new EventEmitter<FormTypeOptions>();

  constructor(private dialog: MatDialog, public formTypeService: FormTypeService) { }

  ngOnInit(): void {

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
        this.onRemove.emit()
      }
    })
  }

  toggleEdit() {
    this.onToggleEdit.emit(this.options)
  }

  getHTMLCode(formType?: FormType): string[] {
    const controlName = formType.options.modelName.toLowerCase().replace(/\s/g, "_") + 'Control'

    return [
      '    <mat-form-field>',
      '        <mat-label>' + formType.options.modelName + '</mat-label>',
      '        <input type="text" matInput formControlName="' + controlName + '"',
      '        <mat-error *ngIf="' + controlName + '.invalid">{{getErrorMessage(' + controlName + ')}}</mat-error>',
      '    </mat-form-field>'
    ]
  }

  getImports(): FormTypeImport[] {
    return [
      ImportsLibrary.MATINPUTMODULE
    ]
  }

}
