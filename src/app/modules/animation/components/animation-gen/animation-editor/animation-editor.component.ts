import { Component, Input, OnInit } from '@angular/core';
import { AnimationTemplate } from '../../../models/AnimationTemplate';

@Component({
  selector: 'app-animation-editor',
  templateUrl: './animation-editor.component.html',
  styleUrls: ['./animation-editor.component.scss'],
})
export class AnimationEditorComponent implements OnInit {

  @Input() animationTemplate: AnimationTemplate
  isOpen: boolean = true
  delay: number = 3

  constructor() { }

  ngOnInit(): void {
  }

  getStyleString() {
    const backgroundcolor = this.isOpen ? 'red' : 'blue'

    return {
      'background-color': backgroundcolor,
      'transition': 'all ' + this.delay*0.1 + 's ease'
    }
  }

}
