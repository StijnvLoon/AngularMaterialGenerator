import { CheckboxComponent } from "src/app/modules/form/components/form-gen/formTypeComponents/checkbox/checkbox.component";
import { ColorInputComponent } from "src/app/modules/form/components/form-gen/formTypeComponents/color-input/color-input.component";
import { DateInputComponent } from "src/app/modules/form/components/form-gen/formTypeComponents/date-input/date-input.component";
import { NumberInputComponent } from "src/app/modules/form/components/form-gen/formTypeComponents/number-input/number-input.component";
import { PasswordInputComponent } from "src/app/modules/form/components/form-gen/formTypeComponents/password-input/password-input.component";
import { RadioButtonComponent } from "src/app/modules/form/components/form-gen/formTypeComponents/radio-button/radio-button.component";
import { SliderComponent } from "src/app/modules/form/components/form-gen/formTypeComponents/slider/slider.component";
import { TextInputComponent } from "src/app/modules/form/components/form-gen/formTypeComponents/text-input/text-input.component";

export const FormComponentLibrary = {
  textinput: TextInputComponent,
  passwordinput: PasswordInputComponent,
  numberinput: NumberInputComponent,
  dateinput: DateInputComponent,
  colorinput: ColorInputComponent,
  radiobutton: RadioButtonComponent,
  checkbox: CheckboxComponent,
  slider: SliderComponent
}