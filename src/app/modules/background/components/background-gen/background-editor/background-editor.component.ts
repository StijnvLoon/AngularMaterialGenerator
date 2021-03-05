import { Component, Input, OnInit } from '@angular/core';
import { BackgroundTemplate } from '../../../models/backgroundtemplate';
import { BackgroundRatio } from '../../../models/BackgroundRatio';
import { BackgroundShape } from '../../../models/BackgroundShape';

@Component({
  selector: 'app-background-editor',
  templateUrl: './background-editor.component.html',
  styleUrls: ['./background-editor.component.scss']
})
export class BackgroundEditorComponent implements OnInit {

  @Input() backgroundTemplate: BackgroundTemplate

  constructor() {
  }

  ngOnInit(): void {
  }

  getWidth(): string {

    if(this.backgroundTemplate.ratio.width > this.backgroundTemplate.ratio.height) {
      return '100%'
    } else {
      const percent = (this.backgroundTemplate.ratio.width / this.backgroundTemplate.ratio.height) * 100
      return percent + '%'
    }
  }

  getHeight(): string {

    if(this.backgroundTemplate.ratio.height > this.backgroundTemplate.ratio.width) {
      return '100%'
    } else {
      const percent = (this.backgroundTemplate.ratio.height / this.backgroundTemplate.ratio.width) * 100
      return percent + '%'
    }
  }
}
