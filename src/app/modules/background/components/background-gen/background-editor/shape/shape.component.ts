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

  onMoved($event) {
    //when put down update location values
    this.shape.y = this.shape.y + $event.distance.y
    this.shape.x = this.shape.x + $event.distance.x
  }

  onMouseDown($event) {
    //when started dragging select this shape
    this.shapeService.selectedShape = this.shape
  }

  getHeight(): string {
    return this.shape.height + 'px'
  }

  getWidth(): string {
    return this.shape.width + 'px'
  }

  getTop(): string {
    return 'translateY(' + this.shape.y + ')'
  }

}
