import { trigger, state, style, transition, animate } from '@angular/animations';
import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { formTypeAnimation } from 'src/app/animations/formTypeAnim';
import { verticalListAnimation, verticalListItemAnimation } from 'src/app/animations/vert-list';
import { ConfirmDialog } from 'src/app/dialogs/confirmDialog/confirm-dialog';
import { FormOptions } from 'src/app/models/FormOptions';
import { SidenavService } from 'src/app/services/sidenav.service';
import { FormCategoryLibrary } from 'src/assets/formComponentCategoryLibrary';
import { IFormType } from '../IformType';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss', '../typeGeneral.scss'],
  animations: [
    verticalListAnimation,
    verticalListItemAnimation,
    formTypeAnimation
  ]
})
export class RadioButtonComponent implements AfterViewInit, IFormType {

  public category: FormCategoryLibrary = FormCategoryLibrary.RADIOBUTTON;
  public options: FormOptions;
  public showPreview: boolean = false
  @Output() onRemove = new EventEmitter();
  @Output() onToggleEdit = new EventEmitter<FormOptions>();

  public animState: string = 'close'

  constructor(private dialog: MatDialog, public sidenavService: SidenavService) { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.animState = 'open'
    });

    if(this.options.radioOptions == undefined) {
      this.options.radioOptions = [
        'option 1',
        'option 2'
      ]
    }
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
      return []
    }
  }

  getTSCodeCallback() {
    return () => {
      return []
    }
  }

  getImportsCallback() {
    return () => {
      return []
    }
  }

}
