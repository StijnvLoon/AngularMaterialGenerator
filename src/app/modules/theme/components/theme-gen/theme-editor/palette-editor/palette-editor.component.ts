import { CdkDragMove } from '@angular/cdk/drag-drop';
import { Component, ElementRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from 'src/app/dialogs/confirmDialog/confirm-dialog';
import { PaletteGeneratorDialog } from 'src/app/modules/theme/dialogs/palette-generator/palette-generator-dialog';
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

  constructor(public themePaletteService: ThemePaletteService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.themePaletteService.systemColors.forEach((color) => {
      this.systemPalettes.push(this.themePaletteService.generatePallete(color.name, color.hex))
    })
    this.userPalettes = this.themePaletteService.userPalettes
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

  openPaletteGenerator(themePalette?: ThemePalette) {

    const dialogRef = this.dialog.open(PaletteGeneratorDialog, {
      width: '800px',
      height: '80%',
      data: {
        title: themePalette ? 'Change palette data' : 'Create new palette',
        palette: themePalette
      }
    });

    dialogRef.afterClosed().subscribe(async palette => {
      if (palette) {
        this.themePaletteService.saveUserPalette(palette)
      }
    })
  }

  deletePalette(palette: ThemePalette) {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '800px',
      data: {
        title: 'Are you sure you want to delete this palette?',
      }
    });

    dialogRef.afterClosed().subscribe(async bool => {
      if (bool) {
        this.themePaletteService.removeUserPalette(palette)
      }
    })
  }

}
