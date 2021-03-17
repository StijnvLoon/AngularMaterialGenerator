import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
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
    //if clicked shape is selectedshape, deselect the shape
    if(shape == this.shapeService.selectedShape) {
      this.shapeService.selectedShape = null
    } else {
      this.shapeService.selectedShape = shape
    }
  }

  addShape() {

    const newShape: BackgroundShape = new BackgroundShape()

    if(!this.shapeService.selectedShape) {
      //if no shape selected, add shape on last index
      this.shapeList.push(newShape)
    } else {
      //if shape selected, add new shape behind selectedshape
      const list: BackgroundShape[] = [newShape]

      transferArrayItem(list,
        this.shapeList,
        0,
        this.shapeList.indexOf(this.shapeService.selectedShape)+1);
    }

    //make the new shape the selectedshape
    this.shapeService.selectedShape = newShape

  }

  removeSelectedShape() {
    if(this.shapeService.selectedShape) {
      const shapeIndex = this.shapeList.indexOf(this.shapeService.selectedShape)

      this.shapeList.splice(shapeIndex, 1)

      //make the first occuring shape the selectedshape
      if(shapeIndex < this.shapeList.length) {
        this.shapeService.selectedShape = this.shapeList[shapeIndex]
      } else {
        this.shapeService.selectedShape = this.shapeList[shapeIndex-1]
      }
    }
  }

  moveSelectedShape(amount: number) {
    if(this.shapeService.selectedShape) {
      const prevIndex = this.shapeList.indexOf(this.shapeService.selectedShape)
      const targetIndex = prevIndex + amount
  
      moveItemInArray(this.shapeList, prevIndex, targetIndex)
    }
  }

}
