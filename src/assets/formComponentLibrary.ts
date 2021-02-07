import { DateInputComponent } from "src/app/components/form-gen/formTypeComponents/date-input/date-input.component";
import { NumberInputComponent } from "src/app/components/form-gen/formTypeComponents/number-input/number-input.component";
import { PasswordInputComponent } from "src/app/components/form-gen/formTypeComponents/password-input/password-input.component";
import { RadioButtonComponent } from "src/app/components/form-gen/formTypeComponents/radio-button/radio-button.component";
import { TextInputComponent } from "src/app/components/form-gen/formTypeComponents/text-input/text-input.component";

export const FormComponentLibrary = {
  textinput: TextInputComponent,
  passwordinput: PasswordInputComponent,
  numberinput: NumberInputComponent,
  dateinput: DateInputComponent,
  radiobutton: RadioButtonComponent
}