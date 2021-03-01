import { CdkDragMove } from '@angular/cdk/drag-drop';
import { Component, ElementRef, OnInit } from '@angular/core';
import { ThemePalette } from 'src/app/modules/theme/models/ThemePalette';
import { ThemePaletteService } from 'src/app/modules/theme/services/ThemePalette.service';

@Component({
  selector: 'app-palette-editor',
  templateUrl: './palette-editor.component.html',
  styleUrls: ['./palette-editor.component.scss']
})
export class PaletteEditorComponent implements OnInit {

  systemPalettes: ThemePalette[] = []
  userPalettes: ThemePalette[] = []

  constructor(public themePaletteService: ThemePaletteService) { }

  ngOnInit(): void {
    this.themePaletteService.systemColors.forEach((color) => {
      this.systemPalettes.push(this.themePaletteService.generatePallete(color.name, color.hex))
    })
  }

  sortPredicate() {
    return false
  }

  public onDragMove(event, id): void {
    const nodeMovePreview = new ElementRef<HTMLElement>(document.getElementById(id));
    const xPos = event.pointerPosition.x - 20
    const yPos = event.pointerPosition.y - 20
    if (nodeMovePreview?.nativeElement) {
        nodeMovePreview.nativeElement.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`
    }
}

}
