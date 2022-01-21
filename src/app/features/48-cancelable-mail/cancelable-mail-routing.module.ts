import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CancelabMailPageComponent } from './pages/cancelab-mail-page/cancelab-mail-page.component';

const routes: Routes = [
  { path: '', component: CancelabMailPageComponent, },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CancelableMailRoutingModule { }
