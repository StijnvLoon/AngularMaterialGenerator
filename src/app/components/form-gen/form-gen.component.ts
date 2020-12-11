import { Component, OnInit, ViewChild } from '@angular/core';
import { FormTypeKey } from 'src/app/models/enums/FormTypeKey';
import { FormTemplate } from '../../models/formTemplate';
import { FormTypeService } from '../../services/form-type.service';

@Component({
  selector: 'app-form-gen',
  templateUrl: './form-gen.component.html',
  styleUrls: ['./form-gen.component.scss']
})
export class FormGenComponent implements OnInit {

  public formTemplate: FormTemplate

  constructor(private formTypeService: FormTypeService) { }

  ngOnInit(): void {
    this.formTemplate = new FormTemplate('new template')
    this.formTemplate.formTypeList.push(this.formTypeService.createFormType(FormTypeKey.INPUT_TEXT))
    this.formTemplate.formTypeList.push(this.formTypeService.createFormType(FormTypeKey.INPUT_PASSWORD))
  }
}
