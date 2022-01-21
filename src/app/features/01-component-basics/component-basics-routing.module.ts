import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComponentBasicsComponent } from './pages/component-basics/component-basics.component';

const routes: Routes = [
  {
    path: '',
    component: ComponentBasicsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentBasicsRoutingModule {
}
