import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SidenavService } from 'src/app/modules/form/services/sidenav.service';
import { FormCategoryLibrary } from 'src/assets/formComponentCategoryLibrary';
import { ImportsLibrary } from 'src/assets/importsLibrary';
import { FormTypeConcrete } from '../FormTypeConcrete';
import { IFormType } from '../IformType';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss', '../typeGeneral.scss']
})
export class SwitchComponent extends FormTypeConcrete implements IFormType, AfterViewInit {

  public readonly category: FormCategoryLibrary = FormCategoryLibrary.SWITCH

  constructor(public dialog: MatDialog, public sidenavService: SidenavService) {
    super(dialog)
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.animState = 'open'
    });
  }

  getHTMLCodeCallback() {
    return (formGroupName: string) => {
      const controlName = this.options.modelName.toLowerCase().replace(/\s/g, "_") + 'Control'

      return [
        '    <section>',
        '        <mat-slide-toggle' + 'formControlName="' + controlName + '">' + this.options.modelName + '/<mat-slide-toggle>',
        '    </section>'
      ]
    }
  }
  getTSCodeCallback() {
    return () => { return [] }
  }
  getImportsCallback() {
    return () => {
      return [
        ImportsLibrary.MATSLIDETOGGLEMODULE
      ]
    }
  }
  getCssCodeCallback() {
    return () => { return [] }
  }
  getFormControlCallback() {
    return () => {
      return [
        '    ' + this.options.modelName.toLowerCase().replace(/\s/g, "_") + 'Control: new FormControl(),'
      ]
    }
  }

}
