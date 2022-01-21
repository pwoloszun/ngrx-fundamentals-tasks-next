import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingleRoomDetectorComponent } from './pages/single-room-detector/single-room-detector.component';

const routes: Routes = [
  {
    path: '',
    component: SingleRoomDetectorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SingleRoomDetectorRoutingModule {
}
