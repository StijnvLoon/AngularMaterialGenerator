import { FormTypeImport } from './formType'

export class ImportsLibrary {

    static readonly MATINPUTMODULE: FormTypeImport = new FormTypeImport('MatInputModule', '@angular/material/input')
    static readonly MATICONMODULE: FormTypeImport = new FormTypeImport('MatIconModule', '@angular/material/icon')
    static readonly MATNATIVEDATEMODULE: FormTypeImport = new FormTypeImport('MatNativeDateModule', '@angular/material/core')
    static readonly MATDATEPICKERMODULE: FormTypeImport = new FormTypeImport('MatDatepickerModule', '@angular/material/datepicker')
    static readonly MATCHECKBOXMODULE: FormTypeImport = new FormTypeImport('MatCheckboxModule', '@angular/material/checkbox')

    constructor() {}
}