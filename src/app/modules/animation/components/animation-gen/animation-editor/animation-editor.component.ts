import { Component, Input, OnInit } from '@angular/core';
import { AnimationTemplate } from '../../../models/AnimationTemplate';
import { AnimationService } from '../../../services/animation.service';

@Component({
  selector: 'app-animation-editor',
  templateUrl: './animation-editor.component.html',
  styleUrls: ['./animation-editor.component.scss'],
})
export class AnimationEditorComponent implements OnInit {

  @Input() animationTemplate: AnimationTemplate

  constructor(private animationService: AnimationService) { }

  ngOnInit(): void {
  }

  getStyleJSON() {
    return this.animationService.mapToJson(this.animationService.selectedState.values)
  }

}
