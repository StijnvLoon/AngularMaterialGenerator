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
import { MatCheckboxModule } from '@angular/material/checkbox';
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

@NgModule({
  declarations: [
    AppComponent,
    LobbyComponent,
    FormGenComponent,
    AddFormTypeDialog,
    ConfirmDialog,
    TextInputComponent,
    PasswordInputComponent,
    DateInputComponent,
    OptionsDrawerComponent,
    FormEditorComponent,
    FormCodeComponent,
    FormTypeHostDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatRippleModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
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
