import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
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
        var usernameSavable: FormSavable = new FormSavable(FormComponentLibrary.textinput, new FormOptions('Username', [
          new Rule(Validators.required, 'This field is required.', ErrorIdentifier.REQUIRED, '      Validators.required')
        ]))

        var passwordOptions: FormOptions = new FormOptions('Password', [
          new Rule(Validators.required, 'This field is required.', ErrorIdentifier.REQUIRED, '      Validators.required')
        ])
        passwordOptions.toggleVis = false
        var passwordSavable: FormSavable = new FormSavable(FormComponentLibrary.passwordinput, passwordOptions)

        var rememberOptions: FormOptions = new FormOptions('Remember')
        rememberOptions.optionalText = 'Remember me!'
        var rememberSavable: FormSavable = new FormSavable(FormComponentLibrary.checkbox, rememberOptions)

        const formTemplate: FormTemplate = new FormTemplate('Login')
        formTemplate.addFormSavable(usernameSavable)
        formTemplate.addFormSavable(passwordSavable)
        formTemplate.addFormSavable(rememberSavable)

        return formTemplate
      }
      case 2: {
        var usernameSavable: FormSavable = new FormSavable(FormComponentLibrary.textinput, new FormOptions('Username', [
          new Rule(Validators.required, 'This field is required.', ErrorIdentifier.REQUIRED, '      Validators.required'),
          new Rule(Validators.minLength(4), 'The text must be creater than 4 characters.', ErrorIdentifier.MINLENGTH, '      Validators.minLength(4)'),
          new Rule(Validators.maxLength(40), 'The text must be smaller than 40 characters.', ErrorIdentifier.MAXLENGTH, '      Validators.maxLength(40)')
        ]))

        var passwordSavable: FormSavable = new FormSavable(FormComponentLibrary.passwordinput, new FormOptions('Password', [
          new Rule(Validators.required, 'This field is required.', ErrorIdentifier.REQUIRED, '      Validators.required'),
          new Rule(Validators.pattern("^((?=\\S*?[A-Z])(?=\\S*?[a-z])(?=\\S*?[0-9]).{6,})\\S$"), 'Min. 6 characters, at least 1 uppercase , 1 lowercase and 1 number. No spaces.', ErrorIdentifier.PATTERN, '      Validators.pattern(\'^((?=\\\\S*?[A-Z])(?=\\\\S*?[a-z])(?=\\\\S*?[0-9]).{6,})\\\\S$\')')
        ]))

        var emailSavable: FormSavable = new FormSavable(FormComponentLibrary.textinput, new FormOptions('Email', [
          new Rule(Validators.required, 'This field is required.', ErrorIdentifier.REQUIRED, '      Validators.required'),
          new Rule(Validators.email, 'Please, enter a valid email', ErrorIdentifier.EMAIL, '      Validators.email')
        ]))

        var birthdaySavable: FormSavable = new FormSavable(FormComponentLibrary.dateinput, new FormOptions('Birthday'))

        var genderOptions: FormOptions = new FormOptions('Gender')
        genderOptions.radioOptions = ['m', 'v']
        var genderSavable: FormSavable = new FormSavable(FormComponentLibrary.radiobutton, genderOptions)

        const formTemplate: FormTemplate = new FormTemplate('Register')
        formTemplate.addFormSavable(usernameSavable)
        formTemplate.addFormSavable(passwordSavable)
        formTemplate.addFormSavable(emailSavable)
        formTemplate.addFormSavable(birthdaySavable)
        formTemplate.addFormSavable(genderSavable)

        return formTemplate
      }
      case 3: {
        var enabledOptions: FormOptions = new FormOptions('Enabled')
        enabledOptions.optionalText = 'Sound enabled'
        var enabledSavable: FormSavable = new FormSavable(FormComponentLibrary.checkbox, enabledOptions)

        var volumeOptions: FormOptions = new FormOptions('Volume')
        volumeOptions.steps = 5
        volumeOptions.thumbLabel = true
        var volumeSavable: FormSavable = new FormSavable(FormComponentLibrary.slider, volumeOptions)

        const formTemplate: FormTemplate = new FormTemplate('Sound settings')
        formTemplate.addFormSavable(enabledSavable)
        formTemplate.addFormSavable(volumeSavable)

        return formTemplate
      }
    }
  }
}
