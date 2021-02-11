import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  public selectedThemeClass: string

  constructor() {
    try {
      this.setThemeClass(localStorage.getItem('theme'))
    } catch (err) {
      this.setThemeClass(this.getAvailableThemes()[0].className)
    }
  }

  setThemeClass(themeClass: string) {
    const bodyElement = document.body;

    if (bodyElement) {
      bodyElement.classList.remove(this.selectedThemeClass);
      bodyElement.classList.add(themeClass);

      this.selectedThemeClass = themeClass
      localStorage.setItem('theme', themeClass)
    }
  }

  getAvailableThemes(): ITheme[] {
    return [
      { className: 'light-blue', primary: '#03A9F4' },
      { className: 'dark-yellow', primary: '#ffeb3b' }
    ]
  }
}

export interface ITheme {
  className: string
  primary: string
}