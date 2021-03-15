import { Component, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { Shape } from '../../../models/BackgroundShape';
import { ShapeService } from '../../../services/shape.service';

@Component({
  selector: 'app-shape-editor',
  templateUrl: './shape-editor.component.html',
  styleUrls: ['./shape-editor.component.scss']
})
export class ShapeEditorComponent implements OnInit {

  availableShapes = []
  elevationDept = 13

  constructor(public shapeService: ShapeService) { }

  ngOnInit(): void {
    for (var shapeEnum in Shape) {
      var isValueProperty = parseInt(shapeEnum, 10) >= 0
      if (isValueProperty) {
        this.availableShapes.push(Shape[shapeEnum])
      }
    }
  }

  getShapeEnum(string: string) {
    return Shape[string]
  }

  updateY($event: MatSliderChange) {
    this.shapeService.selectedShape.y = $event.value
  }

  updateX($event: MatSliderChange) {
    this.shapeService.selectedShape.x = $event.value
  }

  updateHeight($event: MatSliderChange) {
    this.shapeService.selectedShape.height = $event.value
  }

  updateWidth($event: MatSliderChange) {
    this.shapeService.selectedShape.width = $event.value
  }

  updateOpacity($event: MatSliderChange) {
    this.shapeService.selectedShape.opacity = $event.value
  }

  updateRotation($event: MatSliderChange) {
    this.shapeService.selectedShape.rotation = $event.value
  }

}
