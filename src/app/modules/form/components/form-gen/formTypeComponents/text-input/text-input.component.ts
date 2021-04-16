import { AfterViewInit, Component, DoCheck, IterableDiffer, IterableDiffers, OnInit } from '@angular/core';
import { ImportsLibrary } from 'src/assets/importsLibrary';
import { IFormType } from '../IformType'
import { MatDialog } from '@angular/material/dialog';
import { SidenavService } from 'src/app/modules/form/services/sidenav.service';
import { FormCategoryLibrary } from 'src/assets/formComponentCategoryLibrary';
import { FormControl } from '@angular/forms';
import { ErrorIdentifier } from 'src/assets/errorIdentifier';
import { FormTypeConcrete } from '../FormTypeConcrete';
import { RuleService } from 'src/app/modules/form/services/rule.service';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss', '../typeGeneral.scss']
})
export class TextInputComponent extends FormTypeConcrete implements IFormType, OnInit, DoCheck, AfterViewInit {

  public readonly category: FormCategoryLibrary = FormCategoryLibrary.INPUT

  public textFormControl: FormControl = new FormControl('')
  public iterableDiffer: IterableDiffer<unknown>

  constructor(
    public dialog: MatDialog,
    public sidenavService: SidenavService,
    private iterableDiffers: IterableDiffers,
    private ruleService: RuleService) {
    super(dialog)
    try {
      this.iterableDiffer = this.iterableDiffers.find([]).create(null)
    } catch (err) { }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.animState = 'open'

      if (this.options.rules == undefined) {
        this.options.rules = []
      }
      if (this.options.placeholder == undefined) {
        this.options.placeholder = ""
      }
    });
  }

  ngDoCheck() {
    let changes = this.iterableDiffer.diff(this.options.rules);
    if (changes) {
      this.textFormControl.setValidators(this.ruleService.getValidatorList(this.options.rules))
    }
  }

  ngOnInit() {
    this.textFormControl.setValidators(this.ruleService.getValidatorList(this.options.rules))
  }

  getHTMLCodeCallback() {
    return (formGroupName: string) => {
      const controlName = this.options.modelName.toLowerCase().replace(/\s/g, "_") + 'Control'

      const array: string[] = [
        '    <mat-form-field>',
        '        <mat-label>' + this.options.modelName + '</mat-label>',
        '        <input type="text" matInput formControlName="' + controlName + '"' + this.getPlaceHolder() + '>'
      ]

      this.options.rules.forEach(rule => {
        array.push('        <mat-error *ngIf="' + formGroupName + '.get(\'' + controlName.toLowerCase() + '\').hasError(\'' + rule.errorIdentifier.toLowerCase() + '\')">' + rule.errorMessage + '</mat-error>')
      });

      array.push('    </mat-form-field>')

      return array
    }
  }

  getTSCodeCallback() {
    return () => { return [] }
  }

  getImportsCallback() {
    return () => {
      return [
        ImportsLibrary.MATINPUTMODULE
      ]
    }
  }

  getCssCodeCallback() {
    return () => { return [] }
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

    return this.ruleService.getErrorMessage(this.options.rules, ErrorIdentifier[enumId])
  }

  private getPlaceHolder(): string {
    return this.options.placeholder == "" ? '' : ' placeholder="' + this.options.placeholder + '"'
  }
}
