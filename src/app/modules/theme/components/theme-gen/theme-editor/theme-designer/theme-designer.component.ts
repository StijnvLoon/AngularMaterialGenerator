import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { ThemePalette } from 'src/app/modules/theme/models/ThemePalette';
import { ThemeTemplate } from 'src/app/modules/theme/models/ThemeTemplate';

@Component({
  selector: 'app-theme-designer',
  templateUrl: './theme-designer.component.html',
  styleUrls: ['./theme-designer.component.scss']
})
export class ThemeDesignerComponent implements OnInit {

  @Input() themeTemplate: ThemeTemplate

  constructor() { }

  ngOnInit(): void {

  }
  
  dropPrimary(event) {
    const themePalette: ThemePalette = event.previousContainer.data[event.previousIndex]
    this.themeTemplate.primaryPalette = themePalette
  }

  dropAccent(event) {
    const themePalette: ThemePalette = event.previousContainer.data[event.previousIndex]
    this.themeTemplate.accentPalette = themePalette
  }

  dropWarn(event) {
    const themePalette: ThemePalette = event.previousContainer.data[event.previousIndex]
    this.themeTemplate.warnPalette = themePalette
  }

}
