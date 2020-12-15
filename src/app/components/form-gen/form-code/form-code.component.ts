import { Component, Input, OnInit } from '@angular/core';
import { FormTemplate } from 'src/app/models/formTemplate';
import { FormTypeImport } from 'src/app/models/formType';
import { PreviewFile } from 'src/app/models/previewFile';
import { ImportsLibrary } from 'src/app/models/importsLibrary';
import { FormTypeKey } from 'src/app/models/enums/FormTypeKey';

@Component({
  selector: 'app-form-code',
  templateUrl: './form-code.component.html',
  styleUrls: ['./form-code.component.scss']
})
export class FormCodeComponent implements OnInit {

  @Input() formTemplate: FormTemplate
  public previewFileList: PreviewFile[] = []

  constructor() { }

  ngOnInit(): void { }

  updatePreview(): void {
    this.previewFileList = this.getPreviewFiles()
  }

  private getPreviewFiles(): PreviewFile[] {
    return [
      this.getAppModuleFile(),
      this.getComponentTSCode(),
      this.getComponentHTMLCode()
    ]
  }

  private getAppModuleFile(): PreviewFile {
    const appModuleFile: PreviewFile = new PreviewFile('app.module.ts')
    const imports: FormTypeImport[] = this.formTemplate.getImports()

    //optional imports
    appModuleFile.addToCodeLines(['...'])
    appModuleFile.addToCodeLines(["import { ReactiveFormsModule } from '@angular/forms';"])
    imports.forEach(formTypeImport => {
      appModuleFile.addToCodeLines(['import { ' + formTypeImport.moduleName + ' } from \'' + formTypeImport.importLocation + '\';'])
    });
    appModuleFile.addToCodeLines(['...'])

    //ngModule
    appModuleFile.addToCodeLines([
      '@NgModule({',
      '  imports: [',
      '    ...',
      '    ReactiveFormsModule,'
    ])
    imports.forEach(formTypeImport => {
      appModuleFile.addToCodeLines(['    ' + formTypeImport.moduleName + ','])
    });
    appModuleFile.addToCodeLines(['    ...', '  ],'])

    //providers
    if (imports.includes(ImportsLibrary.MATDATEPICKERMODULE)) {
      appModuleFile.addToCodeLines(['  providers: ['])
      appModuleFile.addToCodeLines(['    ' + ImportsLibrary.MATDATEPICKERMODULE.moduleName + ','])
      appModuleFile.addToCodeLines(['  ],'])
    }

    appModuleFile.addToCodeLines(['})', 'export class AppModule { }'])

    return appModuleFile
  }

  private getComponentTSCode(): PreviewFile {
    const componentTSFile: PreviewFile = new PreviewFile(this.formTemplate.name.toLowerCase() + '.component.ts')

    componentTSFile.addToCodeLines([
      '@Component({',
      "  selector: 'app-" + this.formTemplate.name.toLowerCase() + "',",
      "  templateUrl: './" + this.formTemplate.name.toLowerCase() + ".component.html',",
      "  styleUrls: ['./" + this.formTemplate.name.toLowerCase() + ".component.scss'],",
      '})'
    ])

    return componentTSFile
  }

  private getComponentHTMLCode(): PreviewFile {
    const componentHTMLFile: PreviewFile = new PreviewFile(this.formTemplate.name.toLowerCase() + '.component.html')

    componentHTMLFile.addToCodeLines(['<form [formGroup]="' + this.formTemplate.name.toLowerCase() + 'Form">'])

    this.formTemplate.formTypeList.forEach(formType => {
      const controlName = formType.options.modelName.toLowerCase().replace(/\s/g, "") + 'Control'

      switch (formType.key) {
        case FormTypeKey.INPUT_TEXT: {
          componentHTMLFile.addToCodeLines([
            '    <mat-form-field>',
            '        <mat-label>' + formType.options.modelName + '</mat-label>',
            '        <input type="text" matInput formControlName="' + controlName + '"',
            '        <mat-error *ngIf="' + controlName + '.invalid">{{getErrorMessage(' + controlName + ')}}</mat-error>',
            '    </mat-form-field>'
          ])
          break
        }
        case FormTypeKey.INPUT_PASSWORD: {
          if (formType.options.toggleVis) {
            componentHTMLFile.addToCodeLines([
              '    <mat-form-field>',
              '        <mat-label>' + formType.options.modelName + '</mat-label>',
              '        <input [type]="' + controlName + 'Visible ? \'text\' : \'password\'" matInput formControlName="' + controlName + '>',
              '        <button mat-button matSuffix mat-icon-button (click)="' + controlName + 'Visible = !' + controlName + 'Visible">',
              '            <mat-icon>{{' + controlName + 'Visible ? \'visibility\' : \'visibility_off\'}}</mat-icon>',
              '        </button>',
              '        <mat-error *ngIf="' + controlName + '.invalid">{{getErrorMessage(' + controlName + ')}}</mat-error>',
              '    </mat-form-field>'
            ])
          } else {
            componentHTMLFile.addToCodeLines([
              '    <mat-form-field>',
              '        <mat-label>' + formType.options.modelName + '</mat-label>',
              '        <input type="password" matInput formControlName="' + controlName + '>',
              '        <mat-error *ngIf="' + controlName + '.invalid">{{getErrorMessage(' + controlName + ')}}</mat-error>',
              '    </mat-form-field>'
            ])
          }
          break
        }
        case FormTypeKey.INPUT_DATE: {
          if(formType.options.editableText) {
            componentHTMLFile.addToCodeLines([
              '    <mat-form-field>',
              '        <mat-label>' + formType.options.modelName + '</mat-label>',
              '        <input matInput [matDatepicker]="picker" formControlName="' + controlName + '>',
              '        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>',
              '        <mat-datepicker #picker disabled="false"></mat-datepicker>',
              '    </mat-form-field>'
            ])
          } else {
            componentHTMLFile.addToCodeLines([
              '    <mat-form-field (click)="picker.open()">',
              '        <mat-label>' + formType.options.modelName + '</mat-label>',
              '        <input matInput [matDatepicker]="picker" formControlName="' + controlName + '" disabled>',
              '        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>',
              '        <mat-datepicker #picker disabled="false"></mat-datepicker>',
              '    </mat-form-field>'
            ])
          }

          break
        }
      }
      componentHTMLFile.addToCodeLines([''])
    });

    componentHTMLFile.addToCodeLines(['</form>'])

    return componentHTMLFile
  }
}
