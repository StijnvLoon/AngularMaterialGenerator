import { AfterViewInit, Component, DoCheck, EventEmitter, Input, IterableDiffer, IterableDiffers, OnInit, Output } from '@angular/core';
import { ImportsLibrary } from 'src/assets/importsLibrary';
import { IFormType } from '../IformType'
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from 'src/app/dialogs/confirmDialog/confirm-dialog';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormOptions } from 'src/app/models/FormOptions';
import { SidenavService } from 'src/app/services/sidenav.service';
import { FormCategoryLibrary } from 'src/assets/formComponentCategoryLibrary';
import { FormControl, FormGroup } from '@angular/forms';
import { ErrorIdentifier } from 'src/assets/errorIdentifier';
import { formTypeAnimation } from 'src/app/animations/formTypeAnim';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss', '../typeGeneral.scss'],
  animations: [formTypeAnimation]
})
export class TextInputComponent implements IFormType, AfterViewInit, OnInit, DoCheck {

  public readonly category: FormCategoryLibrary = FormCategoryLibrary.INPUT
  public options: FormOptions
  public showPreview: boolean = false
  @Output() onRemove = new EventEmitter();
  @Output() onToggleEdit = new EventEmitter<FormOptions>();

  public animState: string = 'close'
  public textFormControl: FormControl = new FormControl('')
  public iterableDiffer: IterableDiffer<unknown>

  constructor(
    private dialog: MatDialog,
    public sidenavService: SidenavService,
    private iterableDiffers: IterableDiffers) {
    this.iterableDiffer = this.iterableDiffers.find([]).create(null)
  }

  ngDoCheck() {
    let changes = this.iterableDiffer.diff(this.options.rules);
    if (changes) {
      this.textFormControl.setValidators(this.options.getValidators())
    }
  }

  ngOnInit() {
    this.textFormControl.setValidators(this.options.getValidators())
  }

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
      const controlName = this.options.modelName.toLowerCase().replace(/\s/g, "_") + 'Control'

      return [
        '    <mat-form-field>',
        '        <mat-label>' + this.options.modelName + '</mat-label>',
        '        <input type="text" matInput formControlName="' + controlName + '"',
        '        <mat-error *ngIf="' + controlName + '.invalid">{{getErrorMessage(' + controlName + ')}}</mat-error>',
        '    </mat-form-field>'
      ]
    }
  }

  getTSCodeCallback() {
    return () => {
      return []
    }
  }

  getImportsCallback() {
    return () => {
      return [
        ImportsLibrary.MATINPUTMODULE
      ]
    }
  }

  getErrorMessage(formControl: FormControl) {
    const enumId: string = Object.keys(formControl.errors)[0].toUpperCase()

    return this.options.getErrorMessage(
      ErrorIdentifier[enumId]
    )
  }
}
