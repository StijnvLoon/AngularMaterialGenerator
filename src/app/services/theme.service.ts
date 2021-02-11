import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  public selectedThemeClass: string

  constructor() {
    try {
      this.selectedThemeClass = localStorage.getItem('theme')
    } catch (err) {
      this.selectedThemeClass = 'none'
    }
  }

  setThemeClass(themeClass: string) {
    this.selectedThemeClass = themeClass
    localStorage.setItem('theme', themeClass)
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