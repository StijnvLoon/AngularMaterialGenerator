import { Component, Input, OnInit } from '@angular/core';
import { FormType } from 'src/app/models/formType';

@Component({
  selector: 'app-options-drawer',
  templateUrl: './options-drawer.component.html',
  styleUrls: ['./options-drawer.component.scss']
})
export class OptionsDrawerComponent implements OnInit {

  @Input() formType: FormType

  constructor() { }

  ngOnInit(): void {
  }
}
