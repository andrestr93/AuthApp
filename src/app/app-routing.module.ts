import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardRoutingModule } from './dashboard/dashboard-routing.module';

const routes: Routes = [

  {
    path: 'auth',
    //guards

    loadChildren: () => import('./auth/auth-routing.module').then(m => m.AuthRoutingModule)

  },

  {
    path: 'dashboard',
    //guards
    loadChildren: () => import('./dashboard/dashboard-routing.module').then(m => DashboardRoutingModule)
  },

  {
    path: '**',
    redirectTo: 'auth'
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
