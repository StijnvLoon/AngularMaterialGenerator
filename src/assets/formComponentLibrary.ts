import { CheckboxComponent } from "src/app/modules/form/components/form-gen/formTypeComponents/checkbox/checkbox.component";
import { ColorInputComponent } from "src/app/modules/form/components/form-gen/formTypeComponents/color-input/color-input.component";
import { DateInputComponent } from "src/app/modules/form/components/form-gen/formTypeComponents/date-input/date-input.component";
import { FileUploadComponent } from "src/app/modules/form/components/form-gen/formTypeComponents/file-upload/file-upload.component";
import { NumberInputComponent } from "src/app/modules/form/components/form-gen/formTypeComponents/number-input/number-input.component";
import { PasswordInputComponent } from "src/app/modules/form/components/form-gen/formTypeComponents/password-input/password-input.component";
import { RadioButtonComponent } from "src/app/modules/form/components/form-gen/formTypeComponents/radio-button/radio-button.component";
import { SliderComponent } from "src/app/modules/form/components/form-gen/formTypeComponents/slider/slider.component";
import { SwitchComponent } from "src/app/modules/form/components/form-gen/formTypeComponents/switch/switch.component";
import { TextAreaComponent } from "src/app/modules/form/components/form-gen/formTypeComponents/text-area/text-area.component";
import { TextInputComponent } from "src/app/modules/form/components/form-gen/formTypeComponents/text-input/text-input.component";

export const FormComponentLibrary = {
  TextInputComponent: TextInputComponent,
  PasswordInputComponent: PasswordInputComponent,
  NumberInputComponent: NumberInputComponent,
  DateInputComponent: DateInputComponent,
  ColorInputComponent: ColorInputComponent,
  RadioButtonComponent: RadioButtonComponent,
  CheckboxComponent: CheckboxComponent,
  SliderComponent: SliderComponent,
  SwitchComponent: SwitchComponent,
  FileUploadComponent: FileUploadComponent,
  TextAreaComponent: TextAreaComponent
}