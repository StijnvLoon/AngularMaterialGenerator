import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LobbyComponent } from './components/lobby/lobby.component';
import { FormGenComponent } from './modules/form/components/form-gen/form-gen.component';
import { ThemeGenComponent } from './modules/theme/components/theme-gen/theme-gen.component';

const routes: Routes = [
  { path: 'forms/:id', component: FormGenComponent },
  { path: 'themes/:id', component: ThemeGenComponent },
  { path: 'lobby', component: LobbyComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'lobby' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
