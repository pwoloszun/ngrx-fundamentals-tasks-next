import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BindingExamplesComponent } from './pages/binding-examples/binding-examples.component';

const routes: Routes = [
  {
    path: '',
    component: BindingExamplesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BindingExamplesRoutingModule {
}
