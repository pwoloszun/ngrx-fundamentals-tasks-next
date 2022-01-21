import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MailListComponent } from './pages/mail-list/mail-list.component';
import { MailDetailsComponent } from './pages/mail-details/mail-details.component';

const routes: Routes = [
  {
    path: 'mails/:id',
    component: MailDetailsComponent,
  },
  {
    path: 'mails',
    component: MailListComponent,
  },
  { path: '', pathMatch: 'full', redirectTo: 'mails' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyMailRoutingModule { }
