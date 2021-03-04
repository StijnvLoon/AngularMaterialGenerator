import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ThemeSheet } from 'src/app/sheets/theme-sheet/theme-sheet';
declare function require(name:string);
var htmlToImage = require("html-to-image");

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

  export() {
    const node = document.getElementById('canvas')

    htmlToImage.toPng(node)
    .then(function (dataUrl) {

      var element = document.createElement('a');
      element.setAttribute('href', dataUrl);
      element.setAttribute('download', 'filename');
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);


    })
    .catch(function (error) {
      console.error('oops, something went wrong!', error);
    });
  }

}
