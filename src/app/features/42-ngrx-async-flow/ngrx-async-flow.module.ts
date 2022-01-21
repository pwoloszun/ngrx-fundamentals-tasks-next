import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { NgrxAsyncFlowRoutingModule } from './ngrx-async-flow-routing.module';
import { AsyncCounterComponent } from './containers/async-counter/async-counter.component';
import * as fromAsyncCounter from './store/asyncCounter/async-counter.reducer';
import { AsyncCounterEffects } from './store/asyncCounter/async-counter.effects';
import { NgrxAsyncFlowComponent } from './components/ngrx-async-flow/ngrx-async-flow.component';

@NgModule({
  declarations: [
    AsyncCounterComponent,
    NgrxAsyncFlowComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    // feature specific
    NgrxAsyncFlowRoutingModule,
    StoreModule.forFeature(fromAsyncCounter.asyncCounterFeatureKey, fromAsyncCounter.reducer),
    EffectsModule.forFeature([AsyncCounterEffects])
  ],
})
export class NgrxAsyncFlowModule {
}
