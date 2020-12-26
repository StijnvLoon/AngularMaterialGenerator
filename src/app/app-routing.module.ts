import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormGenComponent } from './components/form-gen/form-gen.component';
import { LobbyComponent } from './components/lobby/lobby.component';

const routes: Routes = [
  { path: 'forms', component: FormGenComponent },
  { path: 'lobby', component: LobbyComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'lobby' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
