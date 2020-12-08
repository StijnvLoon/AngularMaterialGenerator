import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss']
})
export class PasswordInputComponent implements OnInit {

  //modelName, toggleVis
  @Input() public options: any

  constructor() { }

  ngOnInit(): void {
  }

}
