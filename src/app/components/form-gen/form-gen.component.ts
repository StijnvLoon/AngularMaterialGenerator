import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormOptions } from 'src/app/models/FormOptions';
import { FormSavable } from 'src/app/models/FormSavable';
import { Rule } from 'src/app/models/Rule';
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

  constructor() { }

  ngOnInit(): void {
    this.formTemplate = new FormTemplate('new_form')

    var savable1: FormSavable = new FormSavable(FormComponentLibrary.textinput, new FormOptions('Input Text',[
      new Rule(Validators.required, 'Required'),
      new Rule(Validators.minLength(4), 'minlength: 4')
    ]))
    var savable2: FormSavable = new FormSavable(FormComponentLibrary.passwordinput, new FormOptions('Input password'))
    var savable3: FormSavable = new FormSavable(FormComponentLibrary.dateinput, new FormOptions('Input date'))
    var savable4: FormSavable = new FormSavable(FormComponentLibrary.radiobutton, new FormOptions('Radio button group'))

    this.formTemplate.addFormSavable(savable1)
    this.formTemplate.addFormSavable(savable2)
    this.formTemplate.addFormSavable(savable3)
    this.formTemplate.addFormSavable(savable4)
  }

  onTabChanged($event) {
    if($event.tab.textLabel == 'Code') {
      this.formCodeComponent.updatePreview()
    }
    this.formEditorComponent.tabIsActive = $event.tab.textLabel == 'Editor'
  }
}
