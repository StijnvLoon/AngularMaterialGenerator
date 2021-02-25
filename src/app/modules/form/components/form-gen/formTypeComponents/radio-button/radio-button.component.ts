import { AfterViewInit, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SidenavService } from 'src/app/modules/form/services/sidenav.service';
import { FormCategoryLibrary } from 'src/assets/formComponentCategoryLibrary';
import { ImportsLibrary } from 'src/assets/importsLibrary';
import { FormTypeConcrete } from '../FormTypeConcrete';
import { IFormType } from '../IformType';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss', '../typeGeneral.scss'],
})
export class RadioButtonComponent extends FormTypeConcrete implements AfterViewInit, IFormType {

  public category: FormCategoryLibrary = FormCategoryLibrary.BUTTON;
  public selectedOption: string

  constructor(public dialog: MatDialog, public sidenavService: SidenavService) {
    super(dialog)
   }

  ngAfterViewInit() {
    setTimeout(() => {
      this.animState = 'open'
      if(this.options.radioOptions == undefined) {
        this.options.radioOptions = [
          'option 1',
          'option 2'
        ]
      }
      this.selectedOption = this.options.radioOptions[0]
    });
  }

  getHTMLCodeCallback() {
    return () => {
      const controlName = this.options.modelName.toLowerCase().replace(/\s/g, "_") + 'Control'

      const array: string[] = [
        '    <section>',
        '        <label>' + this.options.modelName + '</label>',
        '        <mat-radio-group formControlName="' + controlName + '">',
      ]

      this.options.radioOptions.forEach(radioOption => {
        const valueName = radioOption.toLowerCase().replace(/\s/g, "_")
        array.push("           <mat-radio-button value='" + valueName + "'>" + radioOption + "</mat-radio-button>")
      });
      
      array.push('        </mat-radio-group>')
      array.push('    </section>')

      return array
    }
  }

  getTSCodeCallback() {
    return () => {
      return [

      ]
    }
  }

  getCssCodeCallback() {
    return () => {
      return [
        '.mat-radio-group {',
        '    display: flex;',
        '    flex-direction: column;',
        '}'
      ]
    }
  }

  getFormControlCallback() {
    return () => {
      return [
          '    ' + this.options.modelName.toLowerCase().replace(/\s/g, "_") + 'Control: new FormControl(\'' + this.options.radioOptions[0].toLowerCase().replace(/\s/g, "_") + '\'),'
      ]
    }
  }

  getImportsCallback() {
    return () => {
      return [
        ImportsLibrary.MATRADIOBUTTONMODULE
      ]
    }
  }

}
