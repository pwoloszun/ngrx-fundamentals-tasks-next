import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingleRoomDetectorRoutingModule } from './single-room-detector-routing.module';
import { SingleRoomDetectorComponent } from './pages/single-room-detector/single-room-detector.component';
import { StoreModule } from '@ngrx/store';
import * as fromSingleRoomDetector from './store/singleRoomDetector/single-room-detector.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SingleRoomDetectorEffects } from './store/singleRoomDetector/single-room-detector.effects';


@NgModule({
  declarations: [SingleRoomDetectorComponent],
  imports: [
    CommonModule,
    SingleRoomDetectorRoutingModule,
    StoreModule.forFeature(fromSingleRoomDetector.singleRoomDetectorFeatureKey, fromSingleRoomDetector.reducer),
    EffectsModule.forFeature([SingleRoomDetectorEffects])
  ]
})
export class SingleRoomDetectorModule {
}
