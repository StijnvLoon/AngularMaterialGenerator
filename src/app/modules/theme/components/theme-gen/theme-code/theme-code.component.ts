import { Component, Input, OnInit } from '@angular/core';
import { ThemeTemplate } from '../../../models/ThemeTemplate';

@Component({
  selector: 'app-theme-code',
  templateUrl: './theme-code.component.html',
  styleUrls: ['./theme-code.component.scss']
})
export class ThemeCodeComponent implements OnInit {

  @Input() themeTemplate: ThemeTemplate

  constructor() { }

  ngOnInit(): void {
  }

}
