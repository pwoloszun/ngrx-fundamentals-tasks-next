import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NgrxBasicsComponent } from './components/ngrx-basics/ngrx-basics.component';

const routes: Routes = [
  {
    path: '',
    component: NgrxBasicsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NgrxBasicsRoutingModule {
}
