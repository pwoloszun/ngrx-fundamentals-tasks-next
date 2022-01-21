import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManyRoomDetectorsComponent } from './pages/many-room-detectors/many-room-detectors.component';

const routes: Routes = [
  {
    path: '',
    component: ManyRoomDetectorsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManyRoomDetectorsRoutingModule {
}
