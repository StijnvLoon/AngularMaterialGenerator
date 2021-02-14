import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormTemplate } from '../models/FormTemplate';

@Injectable({
  providedIn: 'root'
})
export class FormTemplateService {

  constructor() { }

  downloadFormTemplateJSON(formTemplate: FormTemplate) {
    const json = JSON.stringify(formTemplate.toJson())
    const fileName = formTemplate.name + '.json'

    var element = document.createElement('a');
    element.setAttribute('href', "data:text/json;charset=UTF-8," + encodeURIComponent(json));
    element.setAttribute('download', fileName);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

}
