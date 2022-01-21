import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TestingShellComponent } from './pages/testing-shell/testing-shell.component';
import { PureCmpPageComponent } from './pages/01-pure-cmp-page/pure-cmp-page.component';
import { SmartCmpPageComponent } from './pages/02-smart-cmp-page/smart-cmp-page.component';
import { ServicesPageComponent } from './pages/03-services-page/services-page.component';
import { DirectivesPageComponent } from './pages/directives-page/directives-page.component';
import { PipesPageComponent } from './pages/pipes-page/pipes-page.component';
import { ReactiveFormsPageComponent } from './pages/04-reactive-forms-page/reactive-forms-page.component';

const routes: Routes = [
  {
    path: '',
    component: TestingShellComponent,
    children: [
      { path: 'pure-components', component: PureCmpPageComponent },
      { path: 'smart-components', component: SmartCmpPageComponent },
      { path: 'services', component: ServicesPageComponent },

      { path: 'directives', component: DirectivesPageComponent },
      { path: 'pipes', component: PipesPageComponent },
      { path: 'reactive-forms', component: ReactiveFormsPageComponent },

      { path: '', redirectTo: 'pure-components', pathMatch: 'full' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestingTasksRoutingModule { }
