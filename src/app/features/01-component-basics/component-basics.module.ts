import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';

import { ComponentBasicsRoutingModule } from './component-basics-routing.module';
import { HelloWorldComponent } from './components/hello-world/hello-world.component';
import { PersonalDataComponent } from './components/personal-data/personal-data.component';
import { ComponentBasicsComponent } from './pages/component-basics/component-basics.component';
import { MyClockComponent } from './components/my-clock/my-clock.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ComponentBasicsRoutingModule,
  ],
  declarations: [
    HelloWorldComponent,
    PersonalDataComponent,
    ComponentBasicsComponent,
    MyClockComponent,
  ],
  exports: [
    ComponentBasicsComponent,
  ],
})
export class ComponentBasicsModule {
}
