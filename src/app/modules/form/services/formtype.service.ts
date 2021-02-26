import { Injectable } from '@angular/core';
import { CheckboxComponent } from '../components/form-gen/formTypeComponents/checkbox/checkbox.component';
import { ColorInputComponent } from '../components/form-gen/formTypeComponents/color-input/color-input.component';
import { DateInputComponent } from '../components/form-gen/formTypeComponents/date-input/date-input.component';
import { FileUploadComponent } from '../components/form-gen/formTypeComponents/file-upload/file-upload.component';
import { NumberInputComponent } from '../components/form-gen/formTypeComponents/number-input/number-input.component';
import { PasswordInputComponent } from '../components/form-gen/formTypeComponents/password-input/password-input.component';
import { RadioButtonComponent } from '../components/form-gen/formTypeComponents/radio-button/radio-button.component';
import { SliderComponent } from '../components/form-gen/formTypeComponents/slider/slider.component';
import { SwitchComponent } from '../components/form-gen/formTypeComponents/switch/switch.component';
import { TextAreaComponent } from '../components/form-gen/formTypeComponents/text-area/text-area.component';
import { TextInputComponent } from '../components/form-gen/formTypeComponents/text-input/text-input.component';

@Injectable({
    providedIn: 'root'
})
export class FormTypeService {

    constructor() { }

    getComponentByEnum(formtype: FormTypeEnum): any {
        switch(formtype) {
            case FormTypeEnum.TextInputComponent: {
                return TextInputComponent
            }
            case FormTypeEnum.PasswordInputComponent: {
                return PasswordInputComponent
            }
            case FormTypeEnum.NumberInputComponent: {
                return NumberInputComponent
            }
            case FormTypeEnum.DateInputComponent: {
                return DateInputComponent
            }
            case FormTypeEnum.ColorInputComponent: {
                return ColorInputComponent
            }
            case FormTypeEnum.RadioButtonComponent: {
                return RadioButtonComponent
            }
            case FormTypeEnum.CheckboxComponent: {
                return CheckboxComponent
            }
            case FormTypeEnum.SliderComponent: {
                return SliderComponent
            }
            case FormTypeEnum.SwitchComponent: {
                return SwitchComponent
            }
            case FormTypeEnum.FileUploadComponent: {
                return FileUploadComponent
            }
            case FormTypeEnum.TextAreaComponent: {
                return TextAreaComponent
            }
        }
    }

}

export enum FormTypeEnum {
    TextInputComponent = "TextInputComponent",
    PasswordInputComponent = "PasswordInputComponent",
    NumberInputComponent = "NumberInputComponent",
    DateInputComponent = "DateInputComponent",
    ColorInputComponent = "ColorInputComponent",
    RadioButtonComponent = "RadioButtonComponent",
    CheckboxComponent = "CheckboxComponent",
    SliderComponent = "SliderComponent",
    SwitchComponent = "SwitchComponent",
    FileUploadComponent = "FileUploadComponent",
    TextAreaComponent = "TextAreaComponent"
}