import { Injectable } from '@angular/core';
import { ThemeTemplate } from '../modules/theme/models/ThemeTemplate';
import { ThemePaletteService } from '../modules/theme/services/ThemePalette.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private readonly themeStorage: string = "themetemplates"

  public selectedThemeTemplate: ThemeTemplate
  public systemThemeTemplates: ThemeTemplate[] = [
    new ThemeTemplate(
      'light blue',
      this.themePaletteService.generatePallete(this.themePaletteService.systemColors[6].name, this.themePaletteService.systemColors[6].hex),
      this.themePaletteService.generatePallete(this.themePaletteService.systemColors[4].name, this.themePaletteService.systemColors[4].hex),
      this.themePaletteService.generatePallete(this.themePaletteService.systemColors[13].name, this.themePaletteService.systemColors[13].hex),
      false
    ),
    new ThemeTemplate(
      'dark blue',
      this.themePaletteService.generatePallete(this.themePaletteService.systemColors[4].name, this.themePaletteService.systemColors[4].hex),
      this.themePaletteService.generatePallete(this.themePaletteService.systemColors[5].name, this.themePaletteService.systemColors[5].hex),
      this.themePaletteService.generatePallete(this.themePaletteService.systemColors[12].name, this.themePaletteService.systemColors[12].hex),
      true
    )
  ]
  private userThemeTemplates: ThemeTemplate[] = []

  constructor(private themePaletteService: ThemePaletteService) {
    try {
      this.setTheme(JSON.parse(localStorage.getItem('selectedTheme')))
    } catch (err) {
      this.setTheme(this.systemThemeTemplates[0])
    }

    this.userThemeTemplates = this.retrieveUserThemes()
  }

  getUserThemeTemplatesCopy(): ThemeTemplate[] {
    //copy
    const copy: ThemeTemplate[] = JSON.parse(JSON.stringify(this.userThemeTemplates))
    //remove first index
    copy.shift()
    return copy
  }

  saveThemeTemplate(themeTemplate: ThemeTemplate, isZeroIndex?: boolean): number {
    const array: ThemeTemplate[] = this.retrieveUserThemes()

    if (!isZeroIndex || array[0] == null) {
      array.push(themeTemplate)
    } else {
      array[0] = themeTemplate
    }

    this.userThemeTemplates = array
    localStorage.setItem(this.themeStorage, JSON.stringify(array))
    return array.indexOf(themeTemplate)
  }

  updateThemeTemplate(themeTemplate: ThemeTemplate, index: number) {
    const array: ThemeTemplate[] = this.retrieveUserThemes()
    array[index] = themeTemplate
    this.userThemeTemplates = array
    localStorage.setItem(this.themeStorage, JSON.stringify(array))
  }

  getThemeTemplateByIndex(index: number, onError): ThemeTemplate {
    try {
      return this.userThemeTemplates[index]
    } catch (err) {
      onError()
    }
  }

  setTheme(themeTemplate: ThemeTemplate) {

    //set primary colors
    for (const color of themeTemplate.primaryPalette.colors) {
      const key1 = `--theme-primary-${color.name}`;
      const value1 = color.hex;
      const key2 = `--theme-primary-contrast-${color.name}`;
      const value2 = color.darkContrast ? 'rgba(black, 0.87)' : 'white';
      document.documentElement.style.setProperty(key1, value1);
      document.documentElement.style.setProperty(key2, value2);
    }

    //set accent colors
    for (const color of themeTemplate.accentPalette.colors) {
      const key1 = `--theme-accent-${color.name}`;
      const value1 = color.hex;
      const key2 = `--theme-accent-contrast-${color.name}`;
      const value2 = color.darkContrast ? 'rgba(black, 0.87)' : 'white';
      document.documentElement.style.setProperty(key1, value1);
      document.documentElement.style.setProperty(key2, value2);
    }

    //set warn colors
    for (const color of themeTemplate.warnPalette.colors) {
      const key1 = `--theme-warn-${color.name}`;
      const value1 = color.hex;
      const key2 = `--theme-warn-contrast-${color.name}`;
      const value2 = color.darkContrast ? 'rgba(black, 0.87)' : 'white';
      document.documentElement.style.setProperty(key1, value1);
      document.documentElement.style.setProperty(key2, value2);
    }

    //set dark/light class
    const bodyElement = document.body;

    if (bodyElement) {
      bodyElement.classList.remove('dynamic-light-theme');
      bodyElement.classList.remove('dynamic-dark-theme');

      if (themeTemplate.dark) {
        bodyElement.classList.add('dynamic-dark-theme');
      } else {
        bodyElement.classList.add('dynamic-light-theme');
      }
    }

    this.selectedThemeTemplate = themeTemplate
    localStorage.setItem('selectedTheme', JSON.stringify(themeTemplate))
  }

  private retrieveUserThemes(): ThemeTemplate[] {
    const resultString: ThemeTemplate[] = JSON.parse(localStorage.getItem(this.themeStorage))

    if (resultString == null) {
      return []
    } else {
      return resultString
    }
  }
}