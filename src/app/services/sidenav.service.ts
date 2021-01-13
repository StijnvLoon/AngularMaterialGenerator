import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { FormOptions } from '../models/FormOptions';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  public sidenav: MatSidenav
  public activeFormOptions: FormOptions

  constructor() { }

  toggle(formOptions?: FormOptions) {
    if (this.sidenav.opened && formOptions == undefined) {
      this.close()
    } else if (this.activeFormOptions == formOptions) {
      this.close()
    } else {
      this.activeFormOptions = formOptions
      this.sidenav.open()
    }
  }

  close() {
    this.sidenav.close()
    //animation closes to fast without timeout
    setTimeout(() => {
      this.activeFormOptions = undefined
    }, 200);
  }
}
