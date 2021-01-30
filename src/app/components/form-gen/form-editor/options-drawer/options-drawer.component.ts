import { Component, Input, OnInit } from '@angular/core';
import { FormOptions } from 'src/app/models/FormOptions';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'app-options-drawer',
  templateUrl: './options-drawer.component.html',
  styleUrls: ['./options-drawer.component.scss'],
})
export class OptionsDrawerComponent implements OnInit {

  @Input() options: FormOptions

  constructor(private sidenavService: SidenavService) {
  }

  ngOnInit(): void {
    this.sidenavService.switchTab('main')
  }
}
