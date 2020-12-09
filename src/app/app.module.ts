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
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormGenComponent } from './components/form-gen/form-gen.component';
import { AddFormTypeDialog } from './dialogs/addFormTypeDialog/add-formtype-dialog';
import { TextInputComponent } from './components/form-gen/formTypeComponents/text-input/text-input.component';
import { PasswordInputComponent } from './components/form-gen/formTypeComponents/password-input/password-input.component';
import { DateInputComponent } from './components/form-gen/formTypeComponents/date-input/date-input.component';
import { OptionsDrawerComponent } from './components/form-gen/options-drawer/options-drawer.component';

@NgModule({
  declarations: [
    AppComponent,
    LobbyComponent,
    FormGenComponent,
    AddFormTypeDialog,
    TextInputComponent,
    PasswordInputComponent,
    DateInputComponent,
    OptionsDrawerComponent
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
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
