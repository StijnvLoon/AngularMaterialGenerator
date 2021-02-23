import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    private actionString: string = "OK"
    private horizontalPosition: MatSnackBarHorizontalPosition = 'start';
    private verticalPosition: MatSnackBarVerticalPosition = 'bottom';

    constructor(private _snackBar: MatSnackBar) { }

    notify(message: string) {
        this._snackBar.open(message, this.actionString, {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition
        });
    }

}