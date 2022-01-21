import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// ngrx
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EntityDataModule } from '@ngrx/data';
import { ReactiveComponentModule } from '@ngrx/component';

// app
import { environment } from '../environments/environment';
import { reducers, metaReducers } from './store';
import { AppEffects } from './store/app.effects';
import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from './layout/layout.module';
import { DashboardModule } from './features/dashboard/dashboard.module';
import { AppComponent } from './app.component';
import { ApiModule } from './core/api/api.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    // ngrx
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }),
    // ngrx dev tools
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    // ngrx effects
    EffectsModule.forRoot([AppEffects]),
    // ngrx router
    StoreRouterConnectingModule.forRoot(),
    // ngrx entity data
    EntityDataModule,
    // ngrx component helpers
    ReactiveComponentModule,

    // app
    ApiModule,
    LayoutModule,
    DashboardModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
