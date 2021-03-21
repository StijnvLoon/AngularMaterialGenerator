import { Component, Input, OnInit } from '@angular/core';
import { AnimationTemplate } from '../../../models/AnimationTemplate';
import { StateService } from '../../../services/state.service';

@Component({
  selector: 'app-animation-editor',
  templateUrl: './animation-editor.component.html',
  styleUrls: ['./animation-editor.component.scss'],
})
export class AnimationEditorComponent implements OnInit {

  @Input() animationTemplate: AnimationTemplate

  constructor(private stateService: StateService) { }

  ngOnInit(): void {
  }

  getStyleJSON() {
    return this.mapToJson(this.stateService.selectedState.values)
  }

  private mapToJson(map: Map<String, String>) {
    var string = '{'

    var index = 0
    var lastIndex = map.size-1

    map.forEach((value, key) => {
      if(index == lastIndex) {
        string = string.concat('\"' + key + '\":\"' + value + '\"')
      } else {
        string = string.concat('\"' + key + '\":\"' + value + '\",')
      }
      index++
    });

    string = string.concat('}')
    return JSON.parse(string)
  }

}
