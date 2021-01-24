import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TextDialog } from 'src/app/dialogs/textDialog/text-dialog';
import { FormOptions } from 'src/app/models/FormOptions';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'app-options-drawer',
  templateUrl: './options-drawer.component.html',
  styleUrls: ['./options-drawer.component.scss']
})
export class OptionsDrawerComponent implements OnInit {

  @Input() options: FormOptions

  public modelNameControl: FormControl

  constructor(public sidenavService: SidenavService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.modelNameControl = new FormControl(this.options.modelName, [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ]);

    document.getElementById('main').style.display = "block";
  }

  getErrorMessage(formControl: FormControl) {
    if (formControl.hasError('required')) {
      return 'You must enter a value';
    }
    if (formControl.hasError('minlength')) {
      return 'The text must at least contain ' + formControl.errors.minlength.requiredLength + ' characters' ;
    }
    if (formControl.hasError('maxlength')) {
      return 'The text can\'t exceed ' + formControl.errors.maxlength.requiredLength + ' characters' ;
    }
  }

  switchTab(id: string) {
    setTimeout(() => {
      var tabs: HTMLCollectionOf<Element> = document.getElementsByClassName("tab");

      var i
      for (i = 0; i < tabs.length; i++) {
        const htmlElement: HTMLElement = <HTMLElement>tabs[i]
        htmlElement.style.display = "none";
      }
  
      document.getElementById(id).style.display = "block";
    }, 200);
  }

  addRadioOptionDialog() {
    const dialogRef = this.dialog.open(TextDialog, {
      width: '800px',
      data: {
        title: 'Add dialog option'
      }
    });

    dialogRef.afterClosed().subscribe(async text => {
      if (text) {
        this.options.radioOptions.push(text)
      }
    })
  }
}
