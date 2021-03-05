import { Component, Input, OnInit } from '@angular/core';
import { BackgroundShape } from '../../../models/BackgroundShape';
import { ShapeService } from '../../../services/shape.service';

@Component({
  selector: 'app-shape-manager',
  templateUrl: './shape-manager.component.html',
  styleUrls: ['./shape-manager.component.scss']
})
export class ShapeManagerComponent implements OnInit {

  @Input() shapeList: BackgroundShape[]

  constructor(public shapeService: ShapeService) { }

  ngOnInit(): void {
  }

  selectShape(shape: BackgroundShape) {
    if(shape == this.shapeService.selectedShape) {
      this.shapeService.selectedShape = null
    } else {
      this.shapeService.selectedShape = shape
    }
  }

  addShape() {
    this.shapeList.push(new BackgroundShape())
  }

  removeSelectedShape() {
    if(this.shapeService.selectedShape) {
      this.shapeList.splice(this.shapeList.indexOf(this.shapeService.selectedShape), 1)
    }
  }

}
