import { Output, EventEmitter, Component, AfterViewInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { formTypeAnimation } from "src/app/animations/formTypeAnim";
import { ConfirmDialog } from "src/app/dialogs/confirmDialog/confirm-dialog";
import { FormOptions } from "../../../models/FormOptions";

@Component({
  template: '',
  animations: [formTypeAnimation]
})
export abstract class FormTypeConcrete {

  public options: FormOptions
  public animState: string = 'close'
  public showPreview: boolean = false
  @Output() onRemove = new EventEmitter();
  @Output() onToggleEdit = new EventEmitter<FormOptions>();

  constructor(public dialog: MatDialog) {
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
}