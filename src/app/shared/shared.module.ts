import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { CustomMaterialModule } from './custom-material/custom-material.module';
import { DataTableComponent } from './data-table/data-table.component';
import { CounterComponent } from './counter/counter.component';
import { ErrorModalComponent } from './error-modal/error-modal.component';
import { LeafletMapComponent } from './leaflet-map/leaflet-map.component';
import { MyTodoFormComponent } from './my-todo-form/my-todo-form.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CustomMaterialModule,
    FormsModule,
  ],
  declarations: [
    DataTableComponent,
    CounterComponent,
    ErrorModalComponent,
    LeafletMapComponent,
    MyTodoFormComponent,
  ],
  exports: [
    CustomMaterialModule,
    // components
    DataTableComponent,
    CounterComponent,
    ErrorModalComponent,
    LeafletMapComponent,
    MyTodoFormComponent,
  ],
  entryComponents: [
    ErrorModalComponent,
  ],
})
export class SharedModule {
}
