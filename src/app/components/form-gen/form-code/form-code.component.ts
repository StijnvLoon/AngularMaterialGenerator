import { Component, Input, OnInit } from '@angular/core';
import { FormTemplate } from 'src/app/models/formTemplate';
import { FormTypeImport } from 'src/app/models/formType';
import { PreviewFile } from 'src/app/models/previewFile';
import { ImportsLibrary } from 'src/app/models/importsLibrary';

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
      "import { Component } from '@angular/core';",
      "import { FormControl, FormGroup } from '@angular/forms';'",
      '',
      '@Component({',
      "  selector: 'app-" + this.formTemplate.name.toLowerCase().replace(/\s/g, "-") + "',",
      "  templateUrl: './" + this.formTemplate.name.toLowerCase().replace(/\s/g, "-") + ".component.html',",
      "  styleUrls: ['./" + this.formTemplate.name.toLowerCase().replace(/\s/g, "-") + ".component.scss'],",
      '})',
      'export class ' + this.formTemplate.name.toLowerCase().replace(/\s/g, "") + 'Component' + '{',
      '  ' + this.formTemplate.name.toLowerCase().replace(/\s/g, "") + 'Form = new FormGroup({'
    ])

    this.formTemplate.formTypeList.forEach(formType => {
      componentTSFile.addToCodeLines(['    ' + formType.options.modelName.toLowerCase().replace(/\s/g, "_") + 'Control = new FormControl(\'\'),'])
    });

    componentTSFile.addToCodeLines(['  });', '',])

    componentTSFile.addToCodeLines([
      '  onSubmit() {',
      '    console.log(this.' + this.formTemplate.name.toLowerCase().replace(/\s/g, "") + 'Form.value);',
      '  }'
    ])
    componentTSFile.addToCodeLines(['}'])

    return componentTSFile
  }

  private getComponentHTMLCode(): PreviewFile {
    const componentHTMLFile: PreviewFile = new PreviewFile(this.formTemplate.name.toLowerCase() + '.component.html')

    componentHTMLFile.addToCodeLines([
      '<form [formGroup]="' + this.formTemplate.name.toLowerCase() + 'Form" (ngSubmit)="onSubmit()">',
      ''
    ])

    this.formTemplate.formTypeList.forEach(formType => {
      componentHTMLFile.addToCodeLines(new formType.componentName().getHTMLCode(formType))
      componentHTMLFile.addToCodeLines([''])
    });

    componentHTMLFile.addToCodeLines(['</form>'])

    return componentHTMLFile
  }
}
