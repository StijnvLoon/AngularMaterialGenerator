import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormOptions } from 'src/app/models/FormOptions';
import { FormSavable } from 'src/app/models/FormSavable';
import { Rule } from 'src/app/models/Rule';
import { SidenavService } from 'src/app/services/sidenav.service';
import { ErrorIdentifier } from 'src/assets/errorIdentifier';
import { FormComponentLibrary } from 'src/assets/formComponentLibrary';
import { FormTemplate } from '../../models/formTemplate';
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

  constructor(private sidenavService: SidenavService, private route: ActivatedRoute) { }

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

  getFormtemplateById(id: number): FormTemplate {
    switch (id) {
      case 0: {
        return new FormTemplate('custom_form')
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

        const formTemplate: FormTemplate = new FormTemplate('login_form')
        formTemplate.addFormSavable(usernameSavable)
        formTemplate.addFormSavable(passwordSavable)

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

        var birthdaySavable: FormSavable = new FormSavable(FormComponentLibrary.dateinput, new FormOptions('Birthday'))

        var genderOptions: FormOptions = new FormOptions('Gender')
        genderOptions.radioOptions = ['m', 'v']
        var genderSavable: FormSavable = new FormSavable(FormComponentLibrary.radiobutton, genderOptions)

        const formTemplate: FormTemplate = new FormTemplate('register_form')
        formTemplate.addFormSavable(usernameSavable)
        formTemplate.addFormSavable(passwordSavable)
        formTemplate.addFormSavable(birthdaySavable)
        formTemplate.addFormSavable(genderSavable)

        return formTemplate
      }
    }
  }
}
