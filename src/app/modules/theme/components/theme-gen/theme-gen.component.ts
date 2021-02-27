import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '../../models/ThemePalette';
import { ThemePaletteService } from '../../services/ThemePalette.service';

@Component({
  selector: 'app-theme-gen',
  templateUrl: './theme-gen.component.html',
  styleUrls: ['./theme-gen.component.scss']
})
export class ThemeGenComponent implements OnInit {

  hex: string = ""

  constructor(private themePaletteService: ThemePaletteService) { }

  ngOnInit(): void {

  }

  setPrimary() {
    const palette: ThemePalette = this.themePaletteService.generatePallete('test', this.hex)

    for (const color of palette.colors) {
      const key1 = `--theme-primary-${color.name}`;
      const value1 = color.hex;
      const key2 = `--theme-primary-contrast-${color.name}`;
      const value2 = color.darkContrast ? 'rgba(black, 0.87)' : 'white';
      document.documentElement.style.setProperty(key1, value1);
      document.documentElement.style.setProperty(key2, value2);
    }
  }

}
