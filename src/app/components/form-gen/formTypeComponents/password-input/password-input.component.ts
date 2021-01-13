import { trigger, state, style, transition, animate } from '@angular/animations';
import { AfterViewChecked, AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from 'src/app/dialogs/confirmDialog/confirm-dialog';
import { FormOptions } from 'src/app/models/FormOptions';
import { SidenavService } from 'src/app/services/sidenav.service';
import { ImportsLibrary } from 'src/assets/importsLibrary';
import { IFormType } from '../IformType';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss'],
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
export class PasswordInputComponent implements IFormType, AfterViewInit {

  public options: FormOptions
  @Input() public showPreview: boolean = false;
  @Output() onRemove = new EventEmitter();
  @Output() onToggleEdit = new EventEmitter<FormOptions>();
  
  public animState: string = 'close';

  constructor(private dialog: MatDialog, public sidenavService: SidenavService) { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.animState = 'open'
    });

    if(this.options.toggleVis == undefined) {
      this.options.toggleVis = true
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
      const controlName = this.options.modelName.toLowerCase().replace(/\s/g, "_") + 'Control'
    
      if (this.options.toggleVis) {
        return [
          '    <mat-form-field>',
          '        <mat-label>' + this.options.modelName + '</mat-label>',
          '        <input [type]="' + controlName + 'Visible ? \'text\' : \'password\'" matInput formControlName="' + controlName + '>',
          '        <button mat-button matSuffix mat-icon-button (click)="' + controlName + 'Visible = !' + controlName + 'Visible">',
          '            <mat-icon>{{' + controlName + 'Visible ? \'visibility\' : \'visibility_off\'}}</mat-icon>',
          '        </button>',
          '        <mat-error *ngIf="' + controlName + '.invalid">{{getErrorMessage(' + controlName + ')}}</mat-error>',
          '    </mat-form-field>'
        ]
      } else {
        return [
          '    <mat-form-field>',
          '        <mat-label>' + this.options.modelName + '</mat-label>',
          '        <input type="password" matInput formControlName="' + controlName + '>',
          '        <mat-error *ngIf="' + controlName + '.invalid">{{getErrorMessage(' + controlName + ')}}</mat-error>',
          '    </mat-form-field>'
        ]
      }
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
        ImportsLibrary.MATINPUTMODULE,
        ImportsLibrary.MATICONMODULE
      ]
    }
  }

}
