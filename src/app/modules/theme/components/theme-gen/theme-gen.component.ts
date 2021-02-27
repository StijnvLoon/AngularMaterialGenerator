import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ThemeService } from 'src/app/services/theme.service';
import { ThemeTemplate } from '../../models/ThemeTemplate';
import { ThemePaletteService } from '../../services/ThemePalette.service';

@Component({
  selector: 'app-theme-gen',
  templateUrl: './theme-gen.component.html',
  styleUrls: ['./theme-gen.component.scss']
})
export class ThemeGenComponent implements OnInit {

  public themeTemplate: ThemeTemplate

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private themeService: ThemeService
    ) { }

  ngOnInit(): void {
    let id: string = this.route.snapshot.paramMap.get('id')
    let idNumber: number = +id

    this.themeTemplate = this.themeService.getThemeTemplateByIndex(idNumber, onError => {
      console.log('no template found with this index!')
    })
  }

}
