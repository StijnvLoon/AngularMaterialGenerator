import { Component, Input, OnInit } from '@angular/core';
import { FormType, FormTypeImport, FormTypeOptions } from 'src/app/models/formType';
import { ImportsLibrary } from 'src/app/models/importsLibrary';
import { IFormType } from '../IformType'

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent implements OnInit, IFormType {

  //modelName
  @Input() public options: FormTypeOptions

  constructor() { }

  ngOnInit(): void {

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
