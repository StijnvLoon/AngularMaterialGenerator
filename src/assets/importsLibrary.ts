import { FormImport } from '../app/modules/form/models/FormImport'

export class ImportsLibrary {

    static readonly MATBUTTONMODULE: FormImport = new FormImport('MatButtonModule', '@angular/material/button')
    static readonly MATINPUTMODULE: FormImport = new FormImport('MatInputModule', '@angular/material/input')
    static readonly MATICONMODULE: FormImport = new FormImport('MatIconModule', '@angular/material/icon')
    static readonly MATNATIVEDATEMODULE: FormImport = new FormImport('MatNativeDateModule', '@angular/material/core')
    static readonly MATDATEPICKERMODULE: FormImport = new FormImport('MatDatepickerModule', '@angular/material/datepicker')
    static readonly MATCHECKBOXMODULE: FormImport = new FormImport('MatCheckboxModule', '@angular/material/checkbox')
    static readonly MATRADIOBUTTONMODULE: FormImport = new FormImport('MatRadioModule', '@angular/material/radio')
    static readonly MATSLIDERMODULE: FormImport = new FormImport('MatSliderModule', '@angular/material/slider')
    static readonly MATSLIDETOGGLEMODULE: FormImport = new FormImport('MatSlideToggleModule', '@angular/material/slide-toggle')

    constructor() {}
}