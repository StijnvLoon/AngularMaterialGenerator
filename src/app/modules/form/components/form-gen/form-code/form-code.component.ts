import { Component, Input, OnInit } from '@angular/core';
import { FormImport } from 'src/app/modules/form/models/FormImport';
import { ImportsLibrary } from 'src/assets/importsLibrary';
import { FormTemplate } from '../../../models/FormTemplate';
import { PreviewFile } from '../../../../../models/PreviewFile';
import { FormTemplateService } from '../../../services/formtemplate.service';

@Component({
  selector: 'app-form-code',
  templateUrl: './form-code.component.html',
  styleUrls: ['./form-code.component.scss']
})
export class FormCodeComponent implements OnInit {

  @Input() formTemplate: FormTemplate
  public previewFileList: PreviewFile[] = []

  constructor(private formTemplateService: FormTemplateService) { }

  ngOnInit(): void { }

  updatePreview(): void {
    this.previewFileList = this.getPreviewFiles()
  }

  private getPreviewFiles(): PreviewFile[] {
    return [
      this.getAppModuleFile(),
      this.getComponentTSCode(),
      this.getComponentHTMLCode(),
      this.getComponentCSSCode()
    ]
  }

  private getAppModuleFile(): PreviewFile {
    const appModuleFile: PreviewFile = new PreviewFile('app.module.ts')
    const imports: FormImport[] = this.formTemplateService.getImports(this.formTemplate)

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
      "  selector: 'app-" + this.formTemplateService.getCodeName(this.formTemplate) + "',",
      "  templateUrl: './" + this.formTemplateService.getCodeName(this.formTemplate) + ".component.html',",
      "  styleUrls: ['./" + this.formTemplateService.getCodeName(this.formTemplate) + ".component.scss'],",
      '})',
      'export class ' + this.formTemplateService.getCodeName(this.formTemplate) + 'Component' + '{',
      '  ' + this.formTemplateService.getCodeName(this.formTemplate) + 'Form = new FormGroup({'
    ])

    //formcontrols + validators
    this.formTemplate.formSavables.forEach(formSavable => {
      componentTSFile.addToCodeLines(formSavable.getFormControl())
    });


    componentTSFile.addToCodeLines([
      '  })',
      '',
    ])

    //if there is tscode, add it
    this.formTemplate.formSavables.forEach(formSavable => {
      componentTSFile.addToCodeLines(formSavable.getTSCode())
    });

    componentTSFile.addToCodeLines([
      '  onSubmit() {',
      '    console.log(this.' + this.formTemplateService.getCodeName(this.formTemplate) + 'Form.value)',
      '  }',
      '}'
    ])

    return componentTSFile
  }

  private getComponentHTMLCode(): PreviewFile {
    const componentHTMLFile: PreviewFile = new PreviewFile(this.formTemplate.name.toLowerCase() + '.component.html')
    const formGroupName: string = this.formTemplate.name.toLowerCase() + 'Form'

    componentHTMLFile.addToCodeLines([
      '<form [formGroup]="' + formGroupName + '" (ngSubmit)="onSubmit()">',
      ''
    ])

    this.formTemplate.formSavables.forEach(formSavable => {
      componentHTMLFile.addToCodeLines(formSavable.getHTMLCode(formGroupName))
      componentHTMLFile.addToCodeLines([''])
    });

    componentHTMLFile.addToCodeLines([
      '   <button mat-button type="submit" [disabled]="' + formGroupName + '.invalid">submit</button>',
      '',
      '</form>'
    ])

    return componentHTMLFile
  }

  private getComponentCSSCode(): PreviewFile {
    const componentCSSFile: PreviewFile = new PreviewFile(this.formTemplate.name.toLowerCase() + '.component.css')

    componentCSSFile.addToCodeLines([
      'form {',
      '    display: flex;',
      '    flex-direction: column;',
      '    width: 400px;',
      '}',
      '',
    ])

    this.formTemplate.formSavables.forEach(formSavable => {
      componentCSSFile.addToCodeLines(formSavable.getCssCode())
    });

    return componentCSSFile
  }
}
