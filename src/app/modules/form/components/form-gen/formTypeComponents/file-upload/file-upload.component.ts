import { AfterViewInit, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormCategoryLibrary } from 'dist/AMG/assets/formComponentCategoryLibrary';
import { SidenavService } from 'src/app/modules/form/services/sidenav.service';
import { ImportsLibrary } from 'src/assets/importsLibrary';
import { FormTypeConcrete } from '../FormTypeConcrete';
import { IFormType } from '../IformType';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss', '../typeGeneral.scss']
})
export class FileUploadComponent extends FormTypeConcrete implements IFormType, AfterViewInit {

  public readonly category: FormCategoryLibrary = FormCategoryLibrary.REST

  public uploadedFile

  constructor(
    public dialog: MatDialog,
    public sidenavService: SidenavService) {
    super(dialog)
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.animState = 'open'

      if (this.options.optionalText == undefined) {
        this.options.optionalText = "Select file"
      }
    });
  }

  getHTMLCodeCallback() {
    return () => {
      const hiddenInputName = this.options.modelName.toLowerCase().replace(/\s/g, "_") + 'FileInput'

      return [
        '    <section>',
        '        <input hidden (change)="setFile($event)" #' + hiddenInputName + ' type="file">',
        '        <div>' + this.options.modelName + '</div>',
        '        <button type="button" mat-raised-button color="primary" (click)="' + hiddenInputName + '.click()">' + this.options.optionalText + '</button>',
        '    </section>'
      ]
    }
  }

  getTSCodeCallback() {
    return () => {
      return [
        '  setFile($event) {',
        '    const uploadedFile = $event.target.files[0]',
        '    console.log(uploadedFile)',
        '  }',
        ''
      ]
    }
  }

  getImportsCallback() {
    return () => {
      return [
        ImportsLibrary.MATBUTTONMODULE
      ]
    }
  }

  getCssCodeCallback() {
    return () => { return [] }
  }

  getFormControlCallback() {
    return () => { return [] }
  }

  setFile($event) {
    this.uploadedFile = $event.target.files[0]
  }
}
