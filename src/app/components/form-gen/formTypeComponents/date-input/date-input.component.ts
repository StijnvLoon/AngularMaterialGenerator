import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss']
})
export class DateInputComponent implements OnInit {

  //modelName
  @Input() public options: any

  constructor() { }

  ngOnInit(): void {
  }

}
