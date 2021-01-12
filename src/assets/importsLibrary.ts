import { FormImport } from '../app/models/FormImport'

export class ImportsLibrary {

    static readonly MATINPUTMODULE: FormImport = new FormImport('MatInputModule', '@angular/material/input')
    static readonly MATICONMODULE: FormImport = new FormImport('MatIconModule', '@angular/material/icon')
    static readonly MATNATIVEDATEMODULE: FormImport = new FormImport('MatNativeDateModule', '@angular/material/core')
    static readonly MATDATEPICKERMODULE: FormImport = new FormImport('MatDatepickerModule', '@angular/material/datepicker')
    static readonly MATCHECKBOXMODULE: FormImport = new FormImport('MatCheckboxModule', '@angular/material/checkbox')

    constructor() {}
}