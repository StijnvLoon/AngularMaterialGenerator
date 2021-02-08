import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { FormOptions } from '../models/FormOptions';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  public sidenav: MatSidenav
  public activeFormOptions: FormOptions

  private currentTab: string

  constructor() { }

  private setActiveFormOptions(formOptions: FormOptions) {
    if(this.currentTab == 'radio-options' && formOptions.radioOptions == undefined) {
      this.switchTab('main')
    }
    if(this.currentTab == 'rules' && formOptions.rules == undefined) {
      this.switchTab('main')
    }
    this.activeFormOptions = formOptions
  }

  toggle(formOptions?: FormOptions) {
    if (this.sidenav.opened && formOptions == undefined) {
      this.close()
    } else if (this.activeFormOptions == formOptions) {
      this.close()
    } else {
      this.setActiveFormOptions(formOptions)
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

  switchTab(id: string) {
    setTimeout(() => {
      var tabs: HTMLCollectionOf<Element> = document.getElementsByClassName("tab");

      var i
      for (i = 0; i < tabs.length; i++) {
        const htmlElement: HTMLElement = <HTMLElement>tabs[i]
        htmlElement.style.display = "none";
      }

      document.getElementById(id).style.display = "block";
      this.currentTab = id
    }, 50);
  }

  getCurrentTab(): string {
    return this.currentTab
  }
}
