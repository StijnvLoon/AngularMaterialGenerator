import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ThemePalette } from '../../models/ThemePalette';
import { ThemePaletteService } from '../../services/ThemePalette.service';

export interface DialogData {
    title: string,
    palette: ThemePalette
}

@Component({
    selector: 'palette-generator-dialog',
    templateUrl: './palette-generator-dialog.html',
    styleUrls: ['./palette-generator-dialog.scss']
})
export class PaletteGeneratorDialog {
    
    colorInput: FormControl = new FormControl('#000000');
    nameInput: FormControl = new FormControl('', Validators.required)

    constructor(
        public dialogRef: MatDialogRef<PaletteGeneratorDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private paletteService: ThemePaletteService) {
    }

    close(): void {
        this.dialogRef.close();
    }

    submit() {
        this.data.palette.name = this.nameInput.value
        this.dialogRef.close(this.data.palette)
    }

    generatePalette() {
        this.data.palette = this.paletteService.generatePallete(this.nameInput.value, this.colorInput.value)
    }
}