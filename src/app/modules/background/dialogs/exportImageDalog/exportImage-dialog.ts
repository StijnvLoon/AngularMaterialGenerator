import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
declare function require(name: string);
var htmlToImage = require("html-to-image");

export interface DialogData {
  title: string,
  templateName: string
}

@Component({
  selector: 'exportImage-dialog',
  templateUrl: './exportImage-dialog.html',
  styleUrls: ['./exportImage-dialog.scss']
})
export class ExportImageDialog implements OnInit {

  extensionControl = new FormControl(".png");
  qualityControl = new FormControl(96, [
    Validators.min(1),
    Validators.max(100),
    Validators.required,
  ])

  constructor(
    public dialogRef: MatDialogRef<ExportImageDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  close(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  submit() {
    const node = document.getElementById('canvas')

    switch (this.extensionControl.value) {
      case ".png": {
        htmlToImage.toPng(node, { pixelRatio: 1 })
          .then(url => this.downloadFromUrl(url))
          .catch(error => this.throwError(error))
        break
      }
      case ".svg": {
        htmlToImage.toSvg(node, {
          filter: function filter(node) {
            return (node.tagName !== 'i');
          }
        })
          .then(url => this.downloadFromUrl(url))
          .catch(error => this.throwError(error))
        break
      }
      case ".jpeg": {
        htmlToImage.toJpeg(node, { quality: (this.qualityControl.value / 100), pixelRatio: 1 })
          .then(url => this.downloadFromUrl(url))
          .catch(error => this.throwError(error))
        break
      }
    }
  }

  downloadFromUrl(dataUrl: string) {
    var element = document.createElement('a');
    element.setAttribute('href', dataUrl);
    element.setAttribute('download', this.data.templateName);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    this.close()
  }

  throwError(error) {
    console.error('oops, something went wrong!', error);
  }

}