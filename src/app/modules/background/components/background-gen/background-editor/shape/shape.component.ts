import { Component, Input, OnInit } from '@angular/core';
import { ShapeService } from 'src/app/modules/background/services/shape.service';
import { BackgroundShape } from '../../../../models/BackgroundShape';

@Component({
  selector: 'app-shape',
  templateUrl: './shape.component.html',
  styleUrls: ['./shape.component.scss']
})
export class ShapeComponent implements OnInit {

  @Input() shape: BackgroundShape

  constructor(public shapeService: ShapeService) { }

  ngOnInit(): void {
  }

  onClick($event) {
    //when already selected, deselect
    if(this.shapeService.selectedShape == this.shape) {
      this.shapeService.selectedShape = null
    } else {
      this.shapeService.selectedShape = this.shape
    }
  }

  getHeight(): number {
    return this.shapeService.yPercentToPixels(this.shape.height)
  }

  getWidth(): number {
    return this.shapeService.xPercentToPixels(this.shape.width)
  }

  getTransformString(): string {
    //percentage of canvas - own shape length / 2 to center position
    const x = this.shapeService.xPercentToPixels(this.shape.x) - this.shapeService.xPercentToPixels(this.shape.width)/2
    const y = this.shapeService.yPercentToPixels(this.shape.y) - this.shapeService.yPercentToPixels(this.shape.height)/2

    return 'translate(' + x + 'px, ' + y + 'px) rotate(' + this.shape.rotation + 'deg)'
  }

}
