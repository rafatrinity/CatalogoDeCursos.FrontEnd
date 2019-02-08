import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConsultasComponent } from './consultas/consultas.component';

const routes: Routes = [
  { path: '', redirectTo: 'consultas', pathMatch: 'full' },
  { path: 'consultas', component: ConsultasComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule { }
