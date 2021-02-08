import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { formTypeAnimation } from 'src/app/animations/formTypeAnim';
import { ConfirmDialog } from 'src/app/dialogs/confirmDialog/confirm-dialog';
import { FormOptions } from 'src/app/modules/form/models/FormOptions';
import { SidenavService } from 'src/app/modules/form/services/sidenav.service';
import { FormCategoryLibrary } from 'src/assets/formComponentCategoryLibrary';
import { ImportsLibrary } from 'src/assets/importsLibrary';
import { IFormType } from '../IformType';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss', '../typeGeneral.scss'],
  animations: [formTypeAnimation]
})
export class CheckboxComponent implements AfterViewInit, IFormType {

  public category: FormCategoryLibrary = FormCategoryLibrary.CHECKBOX;
  public options: FormOptions;
  public showPreview: boolean = false
  @Output() onRemove = new EventEmitter();
  @Output() onToggleEdit = new EventEmitter<FormOptions>();

  public animState: string = 'close'
  public selectedOption: string

  constructor(private dialog: MatDialog, public sidenavService: SidenavService) { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.animState = 'open'

      if (this.options.optionalText == undefined) {
        this.options.optionalText = 'Optional'
      }
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

      const array: string[] = [
        '    <section>',
        '        <mat-checkbox formControlName="' + controlName + '">' + this.options.optionalText + '</mat-checkbox>',
        '    </section>'
      ]

      return array
    }
  }

  getTSCodeCallback() {
    return () => {
      return [

      ]
    }
  }

  getCssCodeCallback() {
    return () => {
      return [

      ]
    }
  }

  getFormControlCallback() {
    return () => {
      return [
        '    ' + this.options.modelName.toLowerCase().replace(/\s/g, "_") + 'Control: new FormControl(false),'
      ]
    }
  }

  getImportsCallback() {
    return () => {
      return [
        ImportsLibrary.MATCHECKBOXMODULE
      ]
    }
  }

}
