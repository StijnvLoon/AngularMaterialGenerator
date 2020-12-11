import { Component, Input, OnInit } from '@angular/core';
import { FormTemplate } from 'src/app/models/formTemplate';

@Component({
  selector: 'app-form-code',
  templateUrl: './form-code.component.html',
  styleUrls: ['./form-code.component.scss']
})
export class FormCodeComponent implements OnInit {

  @Input() formTemplate: FormTemplate

  constructor() { }

  ngOnInit(): void {
  }

  getCode(): string {
    return JSON.stringify(this.formTemplate) 
  }

}
