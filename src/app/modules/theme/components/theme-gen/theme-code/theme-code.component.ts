import { Component, Input, OnInit } from '@angular/core';
import { PreviewFile } from 'src/app/models/PreviewFile';
import { ThemePalette } from '../../../models/ThemePalette';
import { ThemeTemplate } from '../../../models/ThemeTemplate';

@Component({
  selector: 'app-theme-code',
  templateUrl: './theme-code.component.html',
  styleUrls: ['./theme-code.component.scss']
})
export class ThemeCodeComponent implements OnInit {

  @Input() themeTemplate: ThemeTemplate
  public previewFileList: PreviewFile[] = []

  constructor() { }

  ngOnInit(): void {
  }

  updatePreview(): void {
    this.previewFileList = this.previewFileList = [
      this.getThemeFile(),
      this.getExampleFile(),
      this.getAngularJsonFile()
    ]
  }

  getThemeFile(): PreviewFile {
    const file = new PreviewFile(this.getThemeName() + '.theme.scss')

    const color: string = this.themeTemplate.dark ? 'dark' : 'light'

    file.addToCodeLines([
      '@import "~@angular/material/theming";',
      '@include mat-core();',
      '',
    ])

    file.addToCodeLines(this.getPaletteCodeIfNeeded(this.themeTemplate.primaryPalette))
    file.addToCodeLines(this.getPaletteCodeIfNeeded(this.themeTemplate.accentPalette))
    file.addToCodeLines(this.getPaletteCodeIfNeeded(this.themeTemplate.warnPalette))

    file.addToCodeLines([
      '$' + this.getThemeName() + '-primary: mat-palette(' + this.themeTemplate.primaryPalette.name + ');',
      '$' + this.getThemeName() + '-accent: mat-palette(' + this.themeTemplate.accentPalette.name + ');',
      '$' + this.getThemeName() + '-warn: mat-palette(' + this.themeTemplate.warnPalette.name + ');',
      '',
      '$' + this.getThemeName() + '-theme: mat-' + color + '-theme(' + this.themeTemplate.primaryPalette.name + ', ' + this.themeTemplate.accentPalette.name + ', ' + this.themeTemplate.warnPalette.name + ');',
      '',
      '@include angular-material-theme($' + this.getThemeName() + '-theme);'
    ])

    return file
  }

  getPaletteCodeIfNeeded(palette: ThemePalette): string[] {
    if(palette.name.split('-')[0].includes('$mat')) {
      return []
    } else {
      //TODO standaard '$custom-[name]' bij custom name
      var stringArray: string[] = [
        '$' + palette.name + ': (',
      ]

      palette.colors.forEach((themeColor) => {
        stringArray = stringArray.concat([
          '  ' + themeColor.name + ' : ' + themeColor.hex
        ])
      })

      stringArray = stringArray.concat([
        '  contrast: ('
      ])

      palette.colors.forEach((themeColor) => {
        const contrast = themeColor.darkContrast ? 'rgba(black, 0.87)' : 'white'
        stringArray = stringArray.concat([
          '    ' + themeColor.name + ' : ' + contrast
        ])
      })

      stringArray = stringArray.concat([
        '  )',
        ');',
        ''
      ])

      return stringArray
    }
  }

  getExampleFile(): PreviewFile {
    const file = new PreviewFile('theme-example.component.html')

    file.addToCodeLines([
      '<div style="display: flex; flex-direction: column;">',
      '    <div>',
      '        <button mat-raised-button color="primary">Primary colored button</button>',
      '        <button mat-raised-button color="accent">Accent colored button</button>',
      '        <button mat-raised-button color="warn">Warn colored button</button>',
      '    </div>',
      '',
      '    <div style="height: 50px;"></div>',
      '',
      '    <!-- default = primary on formfields -->',
      '    <mat-form-field>',
      '        <mat-label>Example primary formfield</mat-label>',
      '        <input type="text" matInput>',
      '    </mat-form-field>',
      '<div>'
    ])

    return file
  }

  getAngularJsonFile(): PreviewFile {
    const file = new PreviewFile('angular.json')

    file.addToCodeLines([
      '...',
      '\"styles\": [',
      '  ...',
      '  \"src/' + this.getThemeName() + '.theme.scss\"   <-- place theme file location in styles as last',
      '],',
      '...'
    ])

    return file
  }

  getThemeName(): string {
    return this.themeTemplate.name.toLowerCase().replace(/\s/g, "_")
  }

}
