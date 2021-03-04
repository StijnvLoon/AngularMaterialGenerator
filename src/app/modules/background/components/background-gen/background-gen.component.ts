import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ThemeSheet } from 'src/app/sheets/theme-sheet/theme-sheet';

@Component({
  selector: 'app-background-gen',
  templateUrl: './background-gen.component.html',
  styleUrls: ['./background-gen.component.scss']
})
export class BackgroundGenComponent implements OnInit {

  constructor(private sheet: MatBottomSheet) { }

  ngOnInit(): void {
  }

  openThemeSheet() {
    this.sheet.open(ThemeSheet);
  }

}
