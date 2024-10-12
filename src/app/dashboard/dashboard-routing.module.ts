import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DasboardLayoutComponent } from './layouts/dasboard-layout/dasboard-layout.component';

const routes: Routes = [

  {
    path: '',
    component: DasboardLayoutComponent,
    // children: [

    // ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
