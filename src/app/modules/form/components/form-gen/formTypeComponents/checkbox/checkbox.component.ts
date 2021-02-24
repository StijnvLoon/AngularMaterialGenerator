import { AfterViewInit, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SidenavService } from 'src/app/modules/form/services/sidenav.service';
import { FormCategoryLibrary } from 'src/assets/formComponentCategoryLibrary';
import { ImportsLibrary } from 'src/assets/importsLibrary';
import { FormTypeConcrete } from '../FormTypeConcrete';
import { IFormType } from '../IformType';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss', '../typeGeneral.scss']
})
export class CheckboxComponent extends FormTypeConcrete implements AfterViewInit, IFormType {

  public category: FormCategoryLibrary = FormCategoryLibrary.BUTTON;
  public selectedOption: string

  constructor(public dialog: MatDialog, public sidenavService: SidenavService) {
    super(dialog)
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.animState = 'open'

      if (this.options.optionalText == undefined) {
        this.options.optionalText = 'Optional'
      }
    });
  }

  getHTMLCodeCallback() {
    return () => {
      const controlName = this.options.modelName.toLowerCase().replace(/\s/g, "_") + 'Control'

      const array: string[] = [
        '    <section>',
        '        <mat-checkbox formControlName="' + controlName + '">' + this.options.optionalText + '</mat-checkbox>',
        '    </section>'
      ]

      return array
    }
  }

  getTSCodeCallback() {
    return () => { return [] }
  }

  getCssCodeCallback() {
    return () => { return [] }
  }

  getFormControlCallback() {
    return () => {
      return [
        '    ' + this.options.modelName.toLowerCase().replace(/\s/g, "_") + 'Control: new FormControl(false),'
      ]
    }
  }

  getImportsCallback() {
    return () => {
      return [
        ImportsLibrary.MATCHECKBOXMODULE
      ]
    }
  }

}
