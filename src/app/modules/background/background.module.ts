import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatInputModule } from '@angular/material/input';
import { BackgroundGenComponent } from './components/background-gen/background-gen.component';
import { BackgroundEditorComponent } from './components/background-gen/background-editor/background-editor.component';
import { ShapeComponent } from './components/background-gen/background-editor/shape/shape.component';
import { EditBackgroundTemplateDialog } from './dialogs/editBackgroundTemplateDialog/editbackgroundtemplate-dialog';
import { ExportImageDialog } from './dialogs/exportImageDalog/exportImage-dialog';
import { MatSelectModule } from '@angular/material/select';
import { ShapeManagerComponent } from './components/background-gen/shape-manager/shape-manager.component';
import { ShapeEditorComponent } from './components/background-gen/shape-editor/shape-editor.component';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [
    BackgroundGenComponent,
    BackgroundEditorComponent,
    ShapeComponent,
    EditBackgroundTemplateDialog,
    ExportImageDialog,
    ShapeManagerComponent,
    ShapeEditorComponent
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
    DragDropModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSidenavModule
  ],
  exports: [BackgroundGenComponent]
})
export class BackgroundModule { }
