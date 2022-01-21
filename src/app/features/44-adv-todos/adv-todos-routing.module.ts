import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdvTodosComponent } from './pages/adv-todos/adv-todos.component';

const routes: Routes = [
  {
    path: '',
    component: AdvTodosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvTodosRoutingModule {
}
