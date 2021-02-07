import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LobbyComponent } from './components/lobby/lobby.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormGenComponent } from './components/form-gen/form-gen.component';
import { MatTabsModule } from '@angular/material/tabs';
import { AddFormTypeDialog } from './dialogs/addFormTypeDialog/add-formtype-dialog';
import { ConfirmDialog } from './dialogs/confirmDialog/confirm-dialog';
import { TextInputComponent } from './components/form-gen/formTypeComponents/text-input/text-input.component';
import { PasswordInputComponent } from './components/form-gen/formTypeComponents/password-input/password-input.component';
import { DateInputComponent } from './components/form-gen/formTypeComponents/date-input/date-input.component';
import { OptionsDrawerComponent } from './components/form-gen/form-editor/options-drawer/options-drawer.component';
import { FormEditorComponent } from './components/form-gen/form-editor/form-editor.component';
import { FormCodeComponent } from './components/form-gen/form-code/form-code.component';
import { FormTypeHostDirective } from './directives/form-type-host.directive';
import { ComponentHolderComponent } from './dialogs/addFormTypeDialog/component-holder/component-holder.component';
import { RadioButtonComponent } from './components/form-gen/formTypeComponents/radio-button/radio-button.component';
import { TextDialog } from './dialogs/textDialog/text-dialog';
import { AddRuleDialog } from './dialogs/addRuleDialog/add-rule-dialog';
import { TabMainComponent } from './components/form-gen/form-editor/options-drawer/tabs/tab-main/tab-main.component';
import { TabRulesComponent } from './components/form-gen/form-editor/options-drawer/tabs/tab-rules/tab-rules.component';
import { TabRadioOptionsComponent } from './components/form-gen/form-editor/options-drawer/tabs/tab-radio-options/tab-radio-options.component';

import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { SelectFormTemplateDialog } from './dialogs/selectFormTemplateDialog/select-formtemplate-dialog';
import { NumberInputComponent } from './components/form-gen/formTypeComponents/number-input/number-input.component';

@NgModule({
  declarations: [
    AppComponent,
    LobbyComponent,
    FormGenComponent,
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
    NumberInputComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
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
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule
  ],
  providers: [
    MatDatepickerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
