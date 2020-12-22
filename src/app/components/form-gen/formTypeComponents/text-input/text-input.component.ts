import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormType, FormTypeImport, FormTypeOptions } from 'src/app/models/formType';
import { ImportsLibrary } from 'src/app/models/importsLibrary';
import { IFormType } from '../IformType'
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from 'src/app/dialogs/confirmDialog/confirm-dialog';
import { FormTypeService } from 'src/app/services/form-type.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
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
export class TextInputComponent implements IFormType, AfterViewInit {

  @Input() public options: FormTypeOptions
  @Input() public showPreview: boolean = false
  @Output() onRemove = new EventEmitter();
  @Output() onToggleEdit = new EventEmitter<FormTypeOptions>();

  public animState: string = 'close'

  constructor(private dialog: MatDialog, public formTypeService: FormTypeService) { }

  ngAfterViewInit() {
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
