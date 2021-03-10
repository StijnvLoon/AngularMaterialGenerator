import { Component, OnInit } from '@angular/core';
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

}
