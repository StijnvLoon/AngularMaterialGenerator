import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormOptions } from 'src/app/models/FormOptions';
import { SidenavService } from 'src/app/services/sidenav.service';
import { verticalListAnimation, verticalListItemAnimation } from 'src/app/animations/vert-list';

@Component({
  selector: 'app-tab-main',
  templateUrl: './tab-main.component.html',
  styleUrls: ['./tab-main.component.scss'],
  animations: [
    verticalListAnimation,
    verticalListItemAnimation
  ]
})
export class TabMainComponent implements OnInit {

  @Input() options: FormOptions
  public modelNameControl: FormControl

  constructor(public sidenavService: SidenavService) { }

  ngOnInit(): void {
    this.modelNameControl = new FormControl(this.options.modelName, [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ]);
  }
}
