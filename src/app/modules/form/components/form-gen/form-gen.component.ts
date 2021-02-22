import { Component, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { TextDialog } from 'src/app/dialogs/textDialog/text-dialog';
import { SidenavService } from 'src/app/modules/form/services/sidenav.service';
import { ThemeSheet } from 'src/app/sheets/theme-sheet/theme-sheet';
import { ErrorIdentifier } from 'src/assets/errorIdentifier';
import { FormComponentLibrary } from 'src/assets/formComponentLibrary';
import { FormOptions } from '../../models/FormOptions';
import { FormSavable } from '../../models/FormSavable';
import { FormTemplate } from '../../models/FormTemplate';
import { Rule } from '../../models/Rule';
import { FormTemplateService } from '../../services/formtemplate.service';
import { FormCodeComponent } from './form-code/form-code.component';
import { FormEditorComponent } from './form-editor/form-editor.component';

@Component({
  selector: 'app-form-gen',
  templateUrl: './form-gen.component.html',
  styleUrls: ['./form-gen.component.scss']
})
export class FormGenComponent implements OnInit {

  public formTemplate: FormTemplate
  @ViewChild(FormCodeComponent) private formCodeComponent: FormCodeComponent;
  @ViewChild(FormEditorComponent) private formEditorComponent: FormEditorComponent;

  constructor(
    private sidenavService: SidenavService,
    private route: ActivatedRoute,
    private sheet: MatBottomSheet,
    private dialog: MatDialog,
    public formtemplateService: FormTemplateService) { }

  ngOnInit(): void {
    let id: string = this.route.snapshot.paramMap.get('id')
    let test: number = +id
    this.formTemplate = this.getFormtemplateById(test)
  }

  onTabChanged($event) {
    if ($event.tab.textLabel == 'Code') {
      this.sidenavService.close()
      this.formCodeComponent.updatePreview()
    }
    this.formEditorComponent.tabIsActive = $event.tab.textLabel == 'Editor'
  }

  onTemplateUpload($event) {
    const file = $event.target.files[0]

    this.formtemplateService.convertUploadedFile(file, (formTemplate: FormTemplate) => {
      this.formTemplate = formTemplate
      this.formEditorComponent.refreshSavables(this.formTemplate)
    },
      (err) => {
        console.log(err)
      })
  }

  openThemeSheet() {
    this.sheet.open(ThemeSheet);
  }

  editNameDialog() {
    const nameCopy: string = this.formTemplate.name
    const dialogRef = this.dialog.open(TextDialog, {
      width: '600px',
      data: {
        title: 'Change template name',
        text: nameCopy
      }
    });

    dialogRef.afterClosed().subscribe(async name => {
      if (name) {
        this.formTemplate.name = name
      }
    })
  }

  getFormtemplateById(id: number): FormTemplate {
    switch (id) {
      case 0: {
        return new FormTemplate('Custom')
      }
      case 1: {
        var usernameSavable: FormSavable = new FormSavable(this.formtemplateService.classNameToString(FormComponentLibrary.TextInputComponent), new FormOptions('Username', [
          new Rule('This field is required.', '      Validators.required', ErrorIdentifier.REQUIRED,)
        ]))

        var passwordOptions: FormOptions = new FormOptions('Password', [
          new Rule('This field is required.', '      Validators.required', ErrorIdentifier.REQUIRED)
        ])
        passwordOptions.toggleVis = false
        var passwordSavable: FormSavable = new FormSavable(this.formtemplateService.classNameToString(FormComponentLibrary.PasswordInputComponent), passwordOptions)

        var rememberOptions: FormOptions = new FormOptions('Remember')
        rememberOptions.optionalText = 'Remember me!'
        var rememberSavable: FormSavable = new FormSavable(this.formtemplateService.classNameToString(FormComponentLibrary.CheckboxComponent), rememberOptions)

        const formTemplate: FormTemplate = new FormTemplate('Login')
        formTemplate.formSavables.push(usernameSavable)
        formTemplate.formSavables.push(passwordSavable)
        formTemplate.formSavables.push(rememberSavable)

        return formTemplate
      }
      case 2: {
        var usernameSavable: FormSavable = new FormSavable(this.formtemplateService.classNameToString(FormComponentLibrary.TextInputComponent), new FormOptions('Username', [
          new Rule('This field is required.', '      Validators.required', ErrorIdentifier.REQUIRED),
          new Rule('The text must be creater than 4 characters.', '      Validators.minLength(4)', ErrorIdentifier.MINLENGTH, 4),
          new Rule('The text must be smaller than 40 characters.', '      Validators.maxLength(40)', ErrorIdentifier.MAXLENGTH, 40)
        ]))

        var passwordSavable: FormSavable = new FormSavable(this.formtemplateService.classNameToString(FormComponentLibrary.PasswordInputComponent), new FormOptions('Password', [
          new Rule('This field is required.', '      Validators.required', ErrorIdentifier.REQUIRED),
          new Rule('Min. 6 characters, at least 1 uppercase , 1 lowercase and 1 number. No spaces.', '      Validators.pattern(\'^((?=\\\\S*?[A-Z])(?=\\\\S*?[a-z])(?=\\\\S*?[0-9]).{6,})\\\\S$\')', ErrorIdentifier.PATTERN, "^((?=\\S*?[A-Z])(?=\\S*?[a-z])(?=\\S*?[0-9]).{6,})\\S$")
        ]))

        var emailSavable: FormSavable = new FormSavable(this.formtemplateService.classNameToString(FormComponentLibrary.TextInputComponent), new FormOptions('Email', [
          new Rule('This field is required.', '      Validators.required', ErrorIdentifier.REQUIRED),
          new Rule('Please, enter a valid email', '      Validators.email', ErrorIdentifier.EMAIL)
        ]))

        var birthdaySavable: FormSavable = new FormSavable(this.formtemplateService.classNameToString(FormComponentLibrary.DateInputComponent), new FormOptions('Birthday'))

        var genderOptions: FormOptions = new FormOptions('Gender')
        genderOptions.radioOptions = ['m', 'v']
        var genderSavable: FormSavable = new FormSavable(this.formtemplateService.classNameToString(FormComponentLibrary.RadioButtonComponent), genderOptions)

        const formTemplate: FormTemplate = new FormTemplate('Register')
        formTemplate.formSavables.push(usernameSavable)
        formTemplate.formSavables.push(passwordSavable)
        formTemplate.formSavables.push(emailSavable)
        formTemplate.formSavables.push(birthdaySavable)
        formTemplate.formSavables.push(genderSavable)

        return formTemplate
      }
      case 3: {
        var enabledOptions: FormOptions = new FormOptions('Enabled')
        enabledOptions.optionalText = 'Sound enabled'
        var enabledSavable: FormSavable = new FormSavable(this.formtemplateService.classNameToString(FormComponentLibrary.CheckboxComponent), enabledOptions)

        var volumeOptions: FormOptions = new FormOptions('Volume')
        volumeOptions.steps = 5
        volumeOptions.thumbLabel = true
        var volumeSavable: FormSavable = new FormSavable(this.formtemplateService.classNameToString(FormComponentLibrary.SliderComponent), volumeOptions)

        const formTemplate: FormTemplate = new FormTemplate('Sound settings')
        formTemplate.formSavables.push(enabledSavable)
        formTemplate.formSavables.push(volumeSavable)

        return formTemplate
      }
    }
  }
}
