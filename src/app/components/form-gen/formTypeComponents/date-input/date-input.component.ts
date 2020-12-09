import { ViewChild } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss']
})
export class DateInputComponent implements OnInit {
  @ViewChild('picker') picker: MatDatepicker<[]>;

  //modelName
  @Input() public options: any

  public date: Date

  constructor() { }

  ngOnInit(): void {
  }

  openPicker() {
    if(!this.options.editableText) {
      this.picker.open()
    }
  }
}
