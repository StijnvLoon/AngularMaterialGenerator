import { Component, OnInit } from '@angular/core';
import { BackgroundTemplate } from '../../../models/backgroundtemplate';
import { BackgroundRatio } from '../../../models/BackgroundRatio';

@Component({
  selector: 'app-background-editor',
  templateUrl: './background-editor.component.html',
  styleUrls: ['./background-editor.component.scss']
})
export class BackgroundEditorComponent implements OnInit {

  backgroundTemplate: BackgroundTemplate

  constructor() {
    this.backgroundTemplate = new BackgroundTemplate('test', new BackgroundRatio(16, 9))
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
