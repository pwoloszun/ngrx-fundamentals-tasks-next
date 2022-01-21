import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './features/dashboard/dashboard/dashboard.component';
import { PageNotFoundComponent } from './layout/components/page-not-found/page-not-found.component';

const appRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  // { path: '', pathMatch: 'full', redirectTo: '/forms-tasks' },

  {
    path: 'ngrx-basics',
    loadChildren: () => import('./features/41-ngrx-basics/ngrx-basics.module').then(m => m.NgrxBasicsModule),
  },
  {
    path: 'ngrx-async-flow',
    loadChildren: () => import('./features/42-ngrx-async-flow/ngrx-async-flow.module').then(m => m.NgrxAsyncFlowModule),
  },
  {
    path: 'advanced-todos',
    loadChildren: () => import('./features/44-adv-todos/adv-todos.module').then(m => m.AdvTodosModule),
  },
  {
    path: 'single-room-detector',
    loadChildren: () => import('./features/45-single-room-detector/single-room-detector.module').then(m => m.SingleRoomDetectorModule),
  },
  {
    path: 'many-room-detectors',
    loadChildren: () => import('./features/46-many-room-detectors/many-room-detectors.module').then(m => m.ManyRoomDetectorsModule),
  },
  // {
  //   path: 'my-mail',
  //   loadChildren: () => import('./features/47-my-mail/my-mail.module').then(m => m.MyMailModule),
  // },
  {
    path: 'cancelable-mail',
    loadChildren: () => import('./features/48-cancelable-mail/cancelable-mail.module').then(m => m.CancelableMailModule),
  },

  // {
  //   path: 'my-booking',
  //   loadChildren: () => import('./features/booking/booking.module').then(m => m.BookingModule),
  // },

  // testing
  {
    path: 'testing-tasks',
    loadChildren: () => import('./features/testing-tasks/testing-tasks.module').then((m) => m.TestingTasksModule),
  },

  // e2e testing
  {
    path: 'component-basics',
    loadChildren: () =>
      import('./features/01-component-basics/component-basics.module').then((m) => m.ComponentBasicsModule),
  },
  {
    path: 'binding-examples',
    loadChildren: () =>
      import('./features/02-binding-examples/binding-examples.module').then((m) => m.BindingExamplesModule),
  },
  {
    path: 'inputs-outputs-examples',
    loadChildren: () =>
      import('./features/03-inputs-outputs-examples/inputs-outputs-examples.module').then(
        (m) => m.InputsOutputsExamplesModule
      ),
  },
  {
    path: 'cy-tasks',
    loadChildren: () => import('./features/cy-tasks/cy-tasks.module').then((m) => m.CyTasksModule),
  },

  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
