import { Component, Input, OnInit } from '@angular/core';
import { FormTemplate } from 'src/app/models/formTemplate';
import { FormTypeImport } from 'src/app/models/formType';
import { PreviewFile } from 'src/app/models/previewFile';

@Component({
  selector: 'app-form-code',
  templateUrl: './form-code.component.html',
  styleUrls: ['./form-code.component.scss']
})
export class FormCodeComponent implements OnInit {

  @Input() formTemplate: FormTemplate
  public previewFileList: PreviewFile[] = []

  constructor() { }

  ngOnInit(): void {
    this.previewFileList = this.getPreviewFiles()
  }

  getPreviewFiles(): PreviewFile[] {

    return [
      this.getAppModuleFile()
    ]
  }

  getAppModuleFile(): PreviewFile {
    const appModuleFile: PreviewFile = new PreviewFile('app.module.ts')
    const imports: FormTypeImport[] = this.formTemplate.getImports()

    //optional imports
    appModuleFile.addToCodeLines(['...'])
    imports.forEach(formTypeImport => {
      appModuleFile.addToCodeLines(['import { ' + formTypeImport.moduleName + ' } from \'' + formTypeImport.importLocation + ' \';'])
    });
    appModuleFile.addToCodeLines(['...'])

    //ngModule
    appModuleFile.addToCodeLines([
      '@NgModule({',
      '  imports: [',
      '  ...'
    ])
    imports.forEach(formTypeImport => {
      appModuleFile.addToCodeLines(['  ' + formTypeImport.moduleName])
    });
    appModuleFile.addToCodeLines(['   ...', '  ]'])



    return appModuleFile
  }
}
