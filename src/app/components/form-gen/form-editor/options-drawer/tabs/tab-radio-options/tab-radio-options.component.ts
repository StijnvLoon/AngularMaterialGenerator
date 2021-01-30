import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { verticalListAnimation, verticalListItemAnimation } from 'src/app/animations/vert-list';
import { TextDialog } from 'src/app/dialogs/textDialog/text-dialog';
import { FormOptions } from 'src/app/models/FormOptions';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'app-tab-radio-options',
  templateUrl: './tab-radio-options.component.html',
  styleUrls: ['./tab-radio-options.component.scss'],
  animations: [
    verticalListAnimation,
    verticalListItemAnimation
  ]
})
export class TabRadioOptionsComponent implements OnInit {

  @Input() options: FormOptions

  constructor(public sidenavService: SidenavService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  addRadioOptionDialog() {
    const dialogRef = this.dialog.open(TextDialog, {
      width: '800px',
      data: {
        title: 'Add radio option'
      }
    });

    dialogRef.afterClosed().subscribe(async text => {
      if (text) {
        this.options.radioOptions.push(text)
      }
    })
  }
}
