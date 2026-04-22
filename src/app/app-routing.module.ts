import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesContainer, HomeContainer } from './core/containers';
import { AuthGuard } from '@auth0/auth0-angular';
import { LoginComponent } from './core/components';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "home",
    component: HomeContainer,
    canActivate: [AuthGuard],
  },
  {
    path: "games",
    component: GamesContainer,
    canActivate: [AuthGuard],
  },
  {
    path: "**",
    redirectTo: "home",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
