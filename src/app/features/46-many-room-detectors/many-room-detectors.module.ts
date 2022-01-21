import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../../shared/shared.module';

import { ManyRoomDetectorsRoutingModule } from './many-room-detectors-routing.module';
import { ManyRoomDetectorsComponent } from './pages/many-room-detectors/many-room-detectors.component';
import { RoomThermometerComponent } from './components/room-thermometer/room-thermometer.component';
import * as fromRoomDetectors from './store/roomDetectors/room-detectors.reducer';
import { RoomDetectorsEffects } from './store/roomDetectors/room-detectors.effects';

@NgModule({
  declarations: [
    ManyRoomDetectorsComponent,
    RoomThermometerComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    // feature specific
    ManyRoomDetectorsRoutingModule,
    StoreModule.forFeature(fromRoomDetectors.roomDetectorsFeatureKey, fromRoomDetectors.reducer),
    EffectsModule.forFeature([RoomDetectorsEffects])
  ]
})
export class ManyRoomDetectorsModule {
}
