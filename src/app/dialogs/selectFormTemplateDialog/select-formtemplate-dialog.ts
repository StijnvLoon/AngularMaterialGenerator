import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ErrorIdentifier } from 'src/assets/errorIdentifier';
import { FormOptions } from 'src/app/modules/form/models/FormOptions';
import { FormSavable } from 'src/app/modules/form/models/FormSavable';
import { FormTemplate } from 'src/app/modules/form/models/FormTemplate';
import { Rule } from 'src/app/modules/form/models/Rule';
import { FormTemplateService } from 'src/app/modules/form/services/formtemplate.service';
import { ThemeService } from 'src/app/services/theme.service';
import { LocalStorageService } from 'src/app/services/localStorage.service';
import { Router } from '@angular/router';
import { ConfirmDialog } from '../confirmDialog/confirm-dialog';
import { verticalListAnimation, verticalListItemAnimation } from 'src/app/animations/vert-list';
import { FormTypeEnum } from 'src/app/modules/form/services/formtype.service';

@Component({
  selector: 'select-formtemplate-dialog',
  templateUrl: './select-formtemplate-dialog.html',
  styleUrls: ['./select-formtemplate-dialog.scss'],
  animations: [
    verticalListAnimation,
    verticalListItemAnimation
  ]
})
export class SelectFormTemplateDialog {

  constructor(
    public dialogRef: MatDialogRef<SelectFormTemplateDialog>,
    public themeService: ThemeService,
    private router: Router,
    private formtemplateService: FormTemplateService,
    public localStorage: LocalStorageService,
    private dialog: MatDialog) {
  }

  submit(id: number, isZeroIndex?: boolean) {
    if (isZeroIndex) {
      this.localStorage.saveFormTemplate(this.getFormtemplateById(id), true)
      this.router.navigate(['/forms/0'])
    } else {
      this.router.navigate(['/forms/' + id])
    }

    this.close()
  }

  close(): void {
    this.dialogRef.close();
  }

  trackByIndex(index, item) {
    return index;
  }

  deleteTemplate(index: number) {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '800px',
      data: {
        title: 'Are you sure you want to remove this formtemplate?'
      }
    });

    dialogRef.afterClosed().subscribe(async bool => {
      if (bool) {
        this.localStorage.deleteFormTemplate(index)
      }
    })
  }

  getFormtemplateById(id: number): FormTemplate {
    switch (id) {
      case 0: {
        return new FormTemplate('Empty')
      }
      case 1: {
        //TODO class is anders in productie, gewoon ENUMS gebruiken, grote switch case om enum om te zetten naar juiste class
        var usernameSavable: FormSavable = new FormSavable(FormTypeEnum.TextInputComponent, new FormOptions('Username', [
          new Rule('This field is required.', '      Validators.required', ErrorIdentifier.REQUIRED)
        ]))

        var passwordOptions: FormOptions = new FormOptions('Password', [
          new Rule('This field is required.', '      Validators.required', ErrorIdentifier.REQUIRED)
        ])
        passwordOptions.toggleVis = false
        var passwordSavable: FormSavable = new FormSavable(FormTypeEnum.PasswordInputComponent, passwordOptions)

        var rememberOptions: FormOptions = new FormOptions('Remember')
        rememberOptions.optionalText = 'Remember me!'
        var rememberSavable: FormSavable = new FormSavable(FormTypeEnum.CheckboxComponent, rememberOptions)

        const formTemplate: FormTemplate = new FormTemplate('Login')
        formTemplate.formSavables.push(usernameSavable)
        formTemplate.formSavables.push(passwordSavable)
        formTemplate.formSavables.push(rememberSavable)

        return formTemplate
      }
      case 2: {
        var usernameSavable: FormSavable = new FormSavable(FormTypeEnum.TextInputComponent, new FormOptions('Username', [
          new Rule('This field is required.', '      Validators.required', ErrorIdentifier.REQUIRED),
          new Rule('The text must be creater than 4 characters.', '      Validators.minLength(4)', ErrorIdentifier.MINLENGTH, 4),
          new Rule('The text must be smaller than 40 characters.', '      Validators.maxLength(40)', ErrorIdentifier.MAXLENGTH, 40)
        ]))

        var passwordSavable: FormSavable = new FormSavable(FormTypeEnum.PasswordInputComponent, new FormOptions('Password', [
          new Rule('This field is required.', '      Validators.required', ErrorIdentifier.REQUIRED),
          new Rule('Min. 6 characters, at least 1 uppercase , 1 lowercase and 1 number. No spaces.', '      Validators.pattern(\'^((?=\\\\S*?[A-Z])(?=\\\\S*?[a-z])(?=\\\\S*?[0-9]).{6,})\\\\S$\')', ErrorIdentifier.PATTERN, "^((?=\\S*?[A-Z])(?=\\S*?[a-z])(?=\\S*?[0-9]).{6,})\\S$")
        ]))

        var emailSavable: FormSavable = new FormSavable(FormTypeEnum.TextInputComponent, new FormOptions('Email', [
          new Rule('This field is required.', '      Validators.required', ErrorIdentifier.REQUIRED),
          new Rule('Please, enter a valid email', '      Validators.email', ErrorIdentifier.EMAIL)
        ]))

        var birthdaySavable: FormSavable = new FormSavable(FormTypeEnum.DateInputComponent, new FormOptions('Birthday'))

        var genderOptions: FormOptions = new FormOptions('Gender')
        genderOptions.radioOptions = ['m', 'v']
        var genderSavable: FormSavable = new FormSavable(FormTypeEnum.RadioButtonComponent, genderOptions)

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
        var enabledSavable: FormSavable = new FormSavable(FormTypeEnum.CheckboxComponent, enabledOptions)

        var volumeOptions: FormOptions = new FormOptions('Volume')
        volumeOptions.steps = 5
        volumeOptions.thumbLabel = true
        var volumeSavable: FormSavable = new FormSavable(FormTypeEnum.SliderComponent, volumeOptions)

        const formTemplate: FormTemplate = new FormTemplate('Sound settings')
        formTemplate.formSavables.push(enabledSavable)
        formTemplate.formSavables.push(volumeSavable)

        return formTemplate
      }
      case 4: {
        var firstnameSavable: FormSavable = new FormSavable(FormTypeEnum.TextInputComponent, new FormOptions('First name', [
          new Rule('This field is required.', '      Validators.required', ErrorIdentifier.REQUIRED)
        ]))
        var lastnameSavable: FormSavable = new FormSavable(FormTypeEnum.TextInputComponent, new FormOptions('Last name', [
          new Rule('This field is required.', '      Validators.required', ErrorIdentifier.REQUIRED)
        ]))
        var emailSavable: FormSavable = new FormSavable(FormTypeEnum.TextInputComponent, new FormOptions('Email', [
          new Rule('This field is required.', '      Validators.required', ErrorIdentifier.REQUIRED),
          new Rule('Please, enter a valid email', '      Validators.email', ErrorIdentifier.EMAIL)
        ]))
        var birthdaySavable: FormSavable = new FormSavable(FormTypeEnum.DateInputComponent, new FormOptions('Birthday'))

        var genderOptions: FormOptions = new FormOptions('Gender')
        genderOptions.radioOptions = ['m', 'v']
        var genderSavable: FormSavable = new FormSavable(FormTypeEnum.RadioButtonComponent, genderOptions)

        var motivationSavable: FormSavable = new FormSavable(FormTypeEnum.TextAreaComponent, new FormOptions('Motivation', [
          new Rule('This field is required.', '      Validators.required', ErrorIdentifier.REQUIRED),
          new Rule('Youre motivation must contain less than 400 characters.', '      Validators.maxLength(400)', ErrorIdentifier.MAXLENGTH, 400)
        ]))

        const cvOptions = new FormOptions("CV", [new Rule('This field is required.', '      Validators.required', ErrorIdentifier.REQUIRED)])
        cvOptions.optionalText = "Upload CV"
        var cvSavable: FormSavable = new FormSavable(FormTypeEnum.FileUploadComponent, cvOptions)
        
        const formTemplate: FormTemplate = new FormTemplate('Job application form')
        formTemplate.formSavables.push(firstnameSavable)
        formTemplate.formSavables.push(lastnameSavable)
        formTemplate.formSavables.push(emailSavable)
        formTemplate.formSavables.push(birthdaySavable)
        formTemplate.formSavables.push(genderSavable)
        formTemplate.formSavables.push(motivationSavable)
        formTemplate.formSavables.push(cvSavable)

        return formTemplate
      }
    }
  }
}