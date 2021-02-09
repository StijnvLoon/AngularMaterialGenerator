import { AfterViewInit, Component, DoCheck, IterableDiffer, IterableDiffers, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SidenavService } from 'src/app/modules/form/services/sidenav.service';
import { ErrorIdentifier } from 'src/assets/errorIdentifier';
import { FormCategoryLibrary } from 'src/assets/formComponentCategoryLibrary';
import { ImportsLibrary } from 'src/assets/importsLibrary';
import { FormTypeConcrete } from '../FormTypeConcrete';
import { IFormType } from '../IformType';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss', '../typeGeneral.scss']
})
export class PasswordInputComponent extends FormTypeConcrete implements IFormType, AfterViewInit, OnInit, DoCheck {

  public readonly category: FormCategoryLibrary = FormCategoryLibrary.INPUT
  public textFormControl: FormControl = new FormControl('')
  public iterableDiffer: IterableDiffer<unknown>

  constructor(
    public dialog: MatDialog,
    public sidenavService: SidenavService,
    private iterableDiffers: IterableDiffers) {
      super(dialog)
    try {
      this.iterableDiffer = this.iterableDiffers.find([]).create(null)
    } catch (err) { }
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
      if (this.options.rules == undefined) {
        this.options.rules = []
      }
    });
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
      if (this.options.toggleVis) {
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