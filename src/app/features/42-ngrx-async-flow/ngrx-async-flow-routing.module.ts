import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NgrxAsyncFlowComponent } from './components/ngrx-async-flow/ngrx-async-flow.component';

const routes: Routes = [
  {
    path: '',
    component: NgrxAsyncFlowComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NgrxAsyncFlowRoutingModule {
}
