import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnimationGenComponent } from './components/animation-gen/animation-gen.component';
import { AnimationEditorComponent } from './components/animation-gen/animation-editor/animation-editor.component';
import { StateManagerComponent } from './components/animation-gen/state-manager/state-manager.component';
import { TransitionManagerComponent } from './components/animation-gen/transition-manager/transition-manager.component';
import { MatMenuModule } from '@angular/material/menu';
import { AnimationStateDialog } from './dialogs/AnimationStateDialog/animation-state.dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    AnimationGenComponent,
    AnimationEditorComponent,
    StateManagerComponent,
    TransitionManagerComponent,
    AnimationStateDialog
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatMenuModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [AnimationGenComponent]
})
export class AnimationModule { }
