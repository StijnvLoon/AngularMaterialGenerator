import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appFormTypeHost]'
})
export class FormTypeHostDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
