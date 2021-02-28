import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeGenComponent } from './components/theme-gen/theme-gen.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ThemeEditorComponent } from './components/theme-gen/theme-editor/theme-editor.component';
import { ThemeCodeComponent } from './components/theme-gen/theme-code/theme-code.component';
import { PaletteEditorComponent } from './components/theme-gen/theme-editor/palette-editor/palette-editor.component';
import { ThemeDesignerComponent } from './components/theme-gen/theme-editor/theme-designer/theme-designer.component';

@NgModule({
  declarations: [
    ThemeGenComponent,
    ThemeEditorComponent,
    ThemeCodeComponent,
    PaletteEditorComponent,
    ThemeDesignerComponent
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
    MatCardModule,
    MatSlideToggleModule,
    DragDropModule
  ],
  exports: [ThemeGenComponent]
})
export class ThemeModule { }
