import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InputsOutputsExamplesComponent } from './pages/inputs-outputs-examples/inputs-outputs-examples.component';

const routes: Routes = [
  {
    path: '',
    component: InputsOutputsExamplesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InputsOutputsExamplesRoutingModule {
}
