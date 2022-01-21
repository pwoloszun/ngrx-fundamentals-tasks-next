import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ParentComponent } from './components/parent/parent.component';
import { ChildComponent } from './components/child/child.component';
import { CarConfiguratorComponent } from './components/car-configurator/car-configurator.component';
import { OptionPickerComponent } from './components/option-picker/option-picker.component';
import { InputsOutputsExamplesComponent } from './pages/inputs-outputs-examples/inputs-outputs-examples.component';
import { InputsOutputsExamplesRoutingModule } from './inputs-outputs-examples-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    InputsOutputsExamplesRoutingModule,
  ],
  declarations: [
    ParentComponent,
    ChildComponent,
    CarConfiguratorComponent,
    OptionPickerComponent,
    InputsOutputsExamplesComponent,
  ],
})
export class InputsOutputsExamplesModule {
}
