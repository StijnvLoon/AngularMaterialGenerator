import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SidenavService } from 'src/app/modules/form/services/sidenav.service';
import { FormCategoryLibrary } from 'src/assets/formComponentCategoryLibrary';
import { ImportsLibrary } from 'src/assets/importsLibrary';
import { FormTypeConcrete } from '../FormTypeConcrete';
import { IFormType } from '../IformType';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss', '../typeGeneral.scss']
})
export class SliderComponent extends FormTypeConcrete implements IFormType, AfterViewInit {

  public readonly category: FormCategoryLibrary = FormCategoryLibrary.SLIDER

  constructor(public dialog: MatDialog, public sidenavService: SidenavService) {
    super(dialog)
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.animState = 'open'

      if (this.options.thumbLabel == undefined) {
        this.options.thumbLabel = false
      }
      if (this.options.inverted == undefined) {
        this.options.inverted = false
      }
      if (this.options.min == undefined) {
        this.options.min = 0
      }
      if (this.options.max == undefined) {
        this.options.max = 100
      }
      if (this.options.steps == undefined) {
        this.options.steps = 1
      }
    });
  }

  getHTMLCodeCallback() {
    return (formGroupName: string) => {
      const controlName = this.options.modelName.toLowerCase().replace(/\s/g, "_") + 'Control'

      return [
        '    <section>',
        '        <div>' + this.options.modelName + '</div>',
        '        <mat-slider',
        '            formControlName="' + controlName + '"',
        '            thumbLabel="' + this.options.thumbLabel + '"',
        '            invert="' + this.options.inverted + '"',
        '            min="' + this.options.min + '"',
        '            max="' + this.options.max + '"',
        '            step="' + this.options.steps + '"',
        '        </mat-slider>',
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
        ImportsLibrary.MATSLIDERMODULE
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
