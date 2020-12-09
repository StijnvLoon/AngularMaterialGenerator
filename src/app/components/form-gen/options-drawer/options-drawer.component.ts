import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormType } from 'src/app/models/formType';

@Component({
  selector: 'app-options-drawer',
  templateUrl: './options-drawer.component.html',
  styleUrls: ['./options-drawer.component.scss']
})
export class OptionsDrawerComponent implements OnInit {

  @Input() formType: FormType

  public modelNameControl: FormControl

  constructor() { }

  ngOnInit(): void {
    this.modelNameControl = new FormControl(this.formType.options.modelName, [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ]);
    console.log(this.modelNameControl)
  }

  getErrorMessage(formControl: FormControl) {
    if (formControl.hasError('required')) {
      return 'You must enter a value';
    }
    if (formControl.hasError('minlength')) {
      return 'The text must at least contain ' + formControl.errors.minlength.requiredLength + ' characters' ;
    }
    if (formControl.hasError('maxlength')) {
      return 'The text can\'t exceed ' + formControl.errors.maxlength.requiredLength + ' characters' ;
    }
  }
}
