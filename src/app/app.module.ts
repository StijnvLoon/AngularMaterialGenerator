import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LobbyComponent } from './components/lobby/lobby.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { FormModule } from './modules/form/form.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { ThemeSheet } from './sheets/theme-sheet/theme-sheet';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';
import { ThemeModule } from './modules/theme/theme.module';

@NgModule({
  declarations: [
    AppComponent,
    LobbyComponent,
    ThemeSheet,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormModule,
    ThemeModule,
    MatToolbarModule,
    MatRippleModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatListModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
