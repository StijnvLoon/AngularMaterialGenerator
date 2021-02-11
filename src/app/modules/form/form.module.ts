import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormCodeComponent } from 'src/app/modules/form/components/form-gen/form-code/form-code.component';
import { FormEditorComponent } from 'src/app/modules/form/components/form-gen/form-editor/form-editor.component';
import { OptionsDrawerComponent } from 'src/app/modules/form/components/form-gen/form-editor/options-drawer/options-drawer.component';
import { TabMainComponent } from 'src/app/modules/form/components/form-gen/form-editor/options-drawer/tabs/tab-main/tab-main.component';
import { TabRadioOptionsComponent } from 'src/app/modules/form/components/form-gen/form-editor/options-drawer/tabs/tab-radio-options/tab-radio-options.component';
import { TabRulesComponent } from 'src/app/modules/form/components/form-gen/form-editor/options-drawer/tabs/tab-rules/tab-rules.component';
import { DateInputComponent } from 'src/app/modules/form/components/form-gen/formTypeComponents/date-input/date-input.component';
import { NumberInputComponent } from 'src/app/modules/form/components/form-gen/formTypeComponents/number-input/number-input.component';
import { PasswordInputComponent } from 'src/app/modules/form/components/form-gen/formTypeComponents/password-input/password-input.component';
import { RadioButtonComponent } from 'src/app/modules/form/components/form-gen/formTypeComponents/radio-button/radio-button.component';
import { TextInputComponent } from 'src/app/modules/form/components/form-gen/formTypeComponents/text-input/text-input.component';
import { AddFormTypeDialog } from 'src/app/modules/form/dialogs/addFormTypeDialog/add-formtype-dialog';
import { ComponentHolderComponent } from 'src/app/modules/form/dialogs/addFormTypeDialog/component-holder/component-holder.component';
import { ConfirmDialog } from 'src/app/dialogs/confirmDialog/confirm-dialog';
import { TextDialog } from 'src/app/dialogs/textDialog/text-dialog';
import { FormTypeHostDirective } from 'src/app/directives/form-type-host.directive';
import { FormGenComponent } from './components/form-gen/form-gen.component';
import { AddRuleDialog } from './dialogs/addRuleDialog/add-rule-dialog';
import { SelectFormTemplateDialog } from '../../dialogs/selectFormTemplateDialog/select-formtemplate-dialog';
import { ColorInputComponent } from './components/form-gen/formTypeComponents/color-input/color-input.component';
import { CheckboxComponent } from './components/form-gen/formTypeComponents/checkbox/checkbox.component';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [
    AddFormTypeDialog,
    SelectFormTemplateDialog,
    AddRuleDialog,
    TextDialog,
    ConfirmDialog,
    TextInputComponent,
    PasswordInputComponent,
    DateInputComponent,
    OptionsDrawerComponent,
    FormEditorComponent,
    FormCodeComponent,
    FormTypeHostDirective,
    ComponentHolderComponent,
    RadioButtonComponent,
    TabMainComponent,
    TabRulesComponent,
    TabRadioOptionsComponent,
    NumberInputComponent,
    FormGenComponent,
    ColorInputComponent,
    CheckboxComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatRippleModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatListModule,
    MatExpansionModule,
    MatMenuModule,
    MatRadioModule,
    MatDividerModule,
    DragDropModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatTabsModule,
    MatToolbarModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule
  ],
  providers: [
    MatDatepickerModule
  ],
  exports: [FormGenComponent]
})
export class FormModule { }
