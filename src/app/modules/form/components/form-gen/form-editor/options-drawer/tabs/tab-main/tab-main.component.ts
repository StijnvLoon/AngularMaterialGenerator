import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SidenavService } from 'src/app/modules/form/services/sidenav.service';
import { verticalListAnimation, verticalListItemAnimation } from 'src/app/animations/vert-list';
import { FormOptions } from 'src/app/modules/form/models/FormOptions';

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
  public optionalTextControl: FormControl

  constructor(public sidenavService: SidenavService) { }

  ngOnInit(): void {
    this.modelNameControl = new FormControl(this.options.modelName, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20)
    ]);
    this.optionalTextControl = new FormControl(this.options.optionalText, [
      Validators.required
    ])
  }
}
