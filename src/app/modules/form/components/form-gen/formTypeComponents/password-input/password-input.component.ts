import { AfterViewInit, Component, DoCheck, EventEmitter, Input, IterableDiffer, IterableDiffers, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { formTypeAnimation } from 'src/app/animations/formTypeAnim';
import { ConfirmDialog } from 'src/app/dialogs/confirmDialog/confirm-dialog';
import { FormOptions } from 'src/app/modules/form/models/FormOptions';
import { SidenavService } from 'src/app/modules/form/services/sidenav.service';
import { ErrorIdentifier } from 'src/assets/errorIdentifier';
import { FormCategoryLibrary } from 'src/assets/formComponentCategoryLibrary';
import { ImportsLibrary } from 'src/assets/importsLibrary';
import { IFormType } from '../IformType';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss', '../typeGeneral.scss'],
  animations: [formTypeAnimation]
})
export class PasswordInputComponent implements IFormType, AfterViewInit, OnInit, DoCheck {

  public readonly category: FormCategoryLibrary = FormCategoryLibrary.INPUT
  public options: FormOptions
  public showPreview: boolean = false;
  @Output() onRemove = new EventEmitter();
  @Output() onToggleEdit = new EventEmitter<FormOptions>();

  public animState: string = 'close';
  public textFormControl: FormControl = new FormControl('')
  public iterableDiffer: IterableDiffer<unknown>

  constructor(
    private dialog: MatDialog,
    public sidenavService: SidenavService,
    private iterableDiffers: IterableDiffers) {
      try {
        this.iterableDiffer = this.iterableDiffers.find([]).create(null)
      } catch(err) { }
  }

  ngDoCheck() {
    let changes = this.iterableDiffer.diff(this.options.rules);
    if (changes) {
      this.textFormControl.setValidators(this.options.getValidators())
    }
  }

  ngOnInit() {
    this.textFormControl.setValidators(this.options.getValidators())
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.animState = 'open'
      
      if (this.options.toggleVis == undefined) {
        this.options.toggleVis = true
      }
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

  getHTMLCodeCallback() {
    return (formGroupName: string) => {
      const controlName = this.options.modelName.toLowerCase().replace(/\s/g, "_") + 'Control'

      var array: string[] = []

      if (this.options.toggleVis) {
        array = array.concat([
          '    <mat-form-field>',
          '        <mat-label>' + this.options.modelName + '</mat-label>',
          '        <input [type]="' + controlName + 'Visible ? \'text\' : \'password\'" matInput formControlName="' + controlName + '">',
          '        <button mat-button matSuffix mat-icon-button type="button" (click)="' + controlName + 'Visible = !' + controlName + 'Visible">',
          '            <mat-icon>{{' + controlName + 'Visible ? \'visibility\' : \'visibility_off\'}}</mat-icon>',
          '        </button>',
        ])
      } else {
        array = array.concat([
          '    <mat-form-field>',
          '        <mat-label>' + this.options.modelName + '</mat-label>',
          '        <input type="password" matInput formControlName="' + controlName + '">',
        ])
      }

      this.options.rules.forEach(rule => {
        array.push('        <mat-error *ngIf="' + formGroupName + '.get(\'' + controlName.toLowerCase() + '\').hasError(\'' + rule.errorIdentifier + '\')">' + rule.errorMessage + '</mat-error>')
      });

      array.push('    </mat-form-field>')

      return array
    }
  }
  getTSCodeCallback() {
    return () => {
      if(this.options.toggleVis) {
        const controlName = this.options.modelName.toLowerCase().replace(/\s/g, "_") + 'Control'
        return ['  ' + controlName + 'Visible: boolean = false', '']
      } else {
        return []
      }
    }
  }

  getImportsCallback() {
    return () => {
      return [
        ImportsLibrary.MATINPUTMODULE,
        ImportsLibrary.MATICONMODULE
      ]
    }
  }

  getCssCodeCallback() {
    return () => {
      return []
    }
  }

  getFormControlCallback() {
    return () => {
      const array: string[] = []

        if (this.options.rules.length > 0) {
          array.push('    ' + this.options.modelName.toLowerCase().replace(/\s/g, "_") + 'Control: new FormControl(\'\', [')

          this.options.rules.forEach(rule => {
            array.push(rule.code + ',')
          });

          array.push('    ]),')
        } else {
          array.push('    ' + this.options.modelName.toLowerCase().replace(/\s/g, "_") + 'Control: new FormControl(\'\'),')
        }

      return array
    }
  }

  getErrorMessage(formControl: FormControl) {
    const enumId: string = Object.keys(formControl.errors)[0].toUpperCase()

    return this.options.getErrorMessage(
      ErrorIdentifier[enumId]
    )
  }

}
