import { Component, OnInit } from '@angular/core';
import { ShapeService } from '../../../services/shape.service';

@Component({
  selector: 'app-shape-editor',
  templateUrl: './shape-editor.component.html',
  styleUrls: ['./shape-editor.component.scss']
})
export class ShapeEditorComponent implements OnInit {

  constructor(public shapeService: ShapeService) { }

  ngOnInit(): void {
  }

}
