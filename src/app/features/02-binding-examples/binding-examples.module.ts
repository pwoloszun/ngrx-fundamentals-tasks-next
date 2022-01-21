import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '@shared/shared.module';

import { BindingExamplesRoutingModule } from './binding-examples-routing.module';
import { PropertyBindingExampleComponent } from './components/01-property-binding-example/property-binding-example.component';
import { EventBindingExampleComponent } from './components/02-event-binding-example/event-binding-example.component';
import { TwoWayBindingExampleComponent } from './components/03-two-way-binding-example/two-way-binding-example.component';
import { BindingExamplesComponent } from './pages/binding-examples/binding-examples.component';
import { StyledTextComponent } from './components/styled-text/styled-text.component';
import { QuadraticEquationComponent } from './components/quadratic-equation/quadratic-equation.component';
import { MyCounterComponent } from './components/my-counter/my-counter.component';
import { MyToggleComponent } from './components/my-toggle/my-toggle.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    BindingExamplesRoutingModule,
  ],
  declarations: [
    PropertyBindingExampleComponent,
    EventBindingExampleComponent,
    TwoWayBindingExampleComponent,
    BindingExamplesComponent,
    StyledTextComponent,
    QuadraticEquationComponent,
    MyCounterComponent,
    MyToggleComponent,
  ],
})
export class BindingExamplesModule {
}
