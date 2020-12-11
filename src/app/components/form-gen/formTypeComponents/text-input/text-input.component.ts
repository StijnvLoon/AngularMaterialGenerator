import { Component, Input, OnInit } from '@angular/core';
import { FormTypeOptions } from 'src/app/models/formType';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent implements OnInit {

  //modelName
  @Input() public options: FormTypeOptions

  constructor() { }

  ngOnInit(): void {

  }

}
