import { Component, Input, OnInit } from '@angular/core';
import { FormType, FormTypeImport, FormTypeOptions } from 'src/app/models/formType';
import { ImportsLibrary } from 'src/app/models/importsLibrary';
import { IFormType } from '../IformType';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss']
})
export class PasswordInputComponent implements OnInit, IFormType {

  public visible: boolean = false

  //modelName, toggleVis
  @Input() public options: FormTypeOptions

  constructor() { }

  ngOnInit(): void {
  }

  getHTMLCode(formType?: FormType): string[] {
    const controlName = formType.options.modelName.toLowerCase().replace(/\s/g, "_") + 'Control'
    
    if (formType.options.toggleVis) {
      return [
        '    <mat-form-field>',
        '        <mat-label>' + formType.options.modelName + '</mat-label>',
        '        <input [type]="' + controlName + 'Visible ? \'text\' : \'password\'" matInput formControlName="' + controlName + '>',
        '        <button mat-button matSuffix mat-icon-button (click)="' + controlName + 'Visible = !' + controlName + 'Visible">',
        '            <mat-icon>{{' + controlName + 'Visible ? \'visibility\' : \'visibility_off\'}}</mat-icon>',
        '        </button>',
        '        <mat-error *ngIf="' + controlName + '.invalid">{{getErrorMessage(' + controlName + ')}}</mat-error>',
        '    </mat-form-field>'
      ]
    } else {
      return [
        '    <mat-form-field>',
        '        <mat-label>' + formType.options.modelName + '</mat-label>',
        '        <input type="password" matInput formControlName="' + controlName + '>',
        '        <mat-error *ngIf="' + controlName + '.invalid">{{getErrorMessage(' + controlName + ')}}</mat-error>',
        '    </mat-form-field>'
      ]
    }
  }

  getImports(): FormTypeImport[] {
    return [
      ImportsLibrary.MATINPUTMODULE,
      ImportsLibrary.MATICONMODULE
    ]
  }

}
