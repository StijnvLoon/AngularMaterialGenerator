import { Component, Input, OnInit } from '@angular/core';
import { ThemePalette } from '../../../models/ThemePalette';
import { ThemeTemplate } from '../../../models/ThemeTemplate';
import { ThemePaletteService } from '../../../services/ThemePalette.service';

@Component({
  selector: 'app-theme-editor',
  templateUrl: './theme-editor.component.html',
  styleUrls: ['./theme-editor.component.scss']
})
export class ThemeEditorComponent implements OnInit {

  @Input() themeTemplate: ThemeTemplate

  constructor() {}

  ngOnInit(): void {
  }

}
