import { Component, Input, OnInit } from '@angular/core';
import { FormImport } from 'src/app/models/FormImport';
import { FormTemplate } from 'src/app/models/formTemplate';
import { PreviewFile } from 'src/app/models/previewFile';
import { ErrorIdentifier } from 'src/assets/errorIdentifier';
import { ImportsLibrary } from 'src/assets/importsLibrary';

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
    const imports: FormImport[] = this.formTemplate.getImports()

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
      "import { Component } from '@angular/core';",
      "import { FormControl, FormGroup } from '@angular/forms';'",
      '',
      '@Component({',
      "  selector: 'app-" + this.formTemplate.getCodeName() + "',",
      "  templateUrl: './" + this.formTemplate.getCodeName() + ".component.html',",
      "  styleUrls: ['./" + this.formTemplate.getCodeName() + ".component.scss'],",
      '})',
      'export class ' + this.formTemplate.getCodeName() + 'Component' + '{',
      '  ' + this.formTemplate.getCodeName() + 'Form = new FormGroup({'
    ])

    //formcontrols + validators
    this.formTemplate.formSavables.forEach(formSavable => {

      if(formSavable.formOptions.rules !== undefined) {
        if (formSavable.formOptions.rules.length > 0) {
          componentTSFile.addToCodeLines(['    ' + formSavable.formOptions.modelName.toLowerCase().replace(/\s/g, "_") + 'Control = new FormControl(\'\', ['])
        } else {
          componentTSFile.addToCodeLines(['    ' + formSavable.formOptions.modelName.toLowerCase().replace(/\s/g, "_") + 'Control = new FormControl(\'\')'])
        }
  
        formSavable.formOptions.rules.forEach(rule => {
          componentTSFile.addToCodeLines([rule.code])
        });
  
        if (formSavable.formOptions.rules.length > 0) {
          componentTSFile.addToCodeLines(['    ]),'])
        }  
      }
      
    });

    componentTSFile.addToCodeLines([
      '  })',
      '',
      '  onSubmit() {',
      '    console.log(this.' + this.formTemplate.getCodeName() + 'Form.value)',
      '  }',
      '}'
    ])

    return componentTSFile
  }

  private getComponentHTMLCode(): PreviewFile {
    const componentHTMLFile: PreviewFile = new PreviewFile(this.formTemplate.name.toLowerCase() + '.component.html')

    componentHTMLFile.addToCodeLines([
      '<form [formGroup]="' + this.formTemplate.name.toLowerCase() + 'Form" (ngSubmit)="onSubmit()">',
      ''
    ])

    this.formTemplate.formSavables.forEach(formSavable => {
      componentHTMLFile.addToCodeLines(formSavable.getHTMLCode())
      componentHTMLFile.addToCodeLines([''])
    });

    componentHTMLFile.addToCodeLines(['</form>'])

    return componentHTMLFile
  }
}
