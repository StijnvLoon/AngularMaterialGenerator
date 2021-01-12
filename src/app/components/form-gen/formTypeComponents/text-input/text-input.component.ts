import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import { ImportsLibrary } from 'src/assets/importsLibrary';
import { IFormType } from '../IformType'
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from 'src/app/dialogs/confirmDialog/confirm-dialog';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormOptions } from 'src/app/models/FormOptions';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  animations: [
    trigger('verticalListAnimation', [
      state('close', style({
        opacity: 0,
        height: '0px'
      })),
      state('open', style({
        opacity: 1,
        height: '*'
      })),
      transition('close => open', animate('0.3s ease')),
      transition('open => close', animate('0.3s ease'))
    ])
  ]
})
export class TextInputComponent implements IFormType, AfterViewInit {

  public options: FormOptions
  public showPreview: boolean = false
  @Output() onRemove = new EventEmitter();
  @Output() onToggleEdit = new EventEmitter<FormOptions>();

  public animState: string = 'close'

  constructor(private dialog: MatDialog) { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.animState = 'open'
    });
  }

  remove() {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '800px',
      data: {
        title: 'Are you sure you want to remove this form component?'
      }
    });

    dialogRef.afterClosed().subscribe(async bool => {
      if (bool) {
        this.animState = 'close'
        setTimeout(() => {
          this.onRemove.emit()
        }, 300);
      }
    })
  }

  toggleEdit() {
    this.onToggleEdit.emit(this.options)
  }

  getHTMLCodeCallback() {
    return () => {
      return this.getHTMLCode()
    }
  }

  private getHTMLCode(): string[] {
    const controlName = this.options.modelName.toLowerCase().replace(/\s/g, "_") + 'Control'

    return [
      '    <mat-form-field>',
      '        <mat-label>' + this.options.modelName + '</mat-label>',
      '        <input type="text" matInput formControlName="' + controlName + '"',
      '        <mat-error *ngIf="' + controlName + '.invalid">{{getErrorMessage(' + controlName + ')}}</mat-error>',
      '    </mat-form-field>'
    ]
  }

  getTSCode() {
    throw new Error('Method not implemented.');
  }

  getImports() {
    return [
      ImportsLibrary.MATINPUTMODULE
    ]
  }

  private toggled: boolean = true

  test() {
    if(this.toggled) {
      this.options.modelName = ' teeeest'
    } else {
      this.options.modelName = 'poep'
    }

    this.toggled = !this.toggled

  }
}
