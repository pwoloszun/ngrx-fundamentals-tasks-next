import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '../../shared/shared.module';

import { NgrxBasicsRoutingModule } from './ngrx-basics-routing.module';
import { NgrxBasicsComponent } from './components/ngrx-basics/ngrx-basics.component';
import * as fromCounter from './store/counter/counter.reducer';
import { SyncCounterComponent } from './containers/sync-counter/sync-counter.component';

@NgModule({
  declarations: [
    NgrxBasicsComponent,
    SyncCounterComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    // feature specific
    NgrxBasicsRoutingModule,
    StoreModule.forFeature(fromCounter.counterFeatureKey, fromCounter.reducer),
  ]
})
export class NgrxBasicsModule {
}
