import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@shared/shared.module';

import { AdvTodosRoutingModule } from './adv-todos-routing.module';
import { AdvTodosComponent } from './pages/adv-todos/adv-todos.component';
import * as fromTodos from './store/todos/todos.reducer';
import { TodosEffects } from './store/todos/todos.effects';
import { MyListComponent } from './components/my-list/my-list.component';
import { MyListItemComponent } from './components/my-list-item/my-list-item.component';
import { MyListItemFormComponent } from './components/my-list-item-form/my-list-item-form.component';

@NgModule({
  declarations: [AdvTodosComponent, MyListComponent, MyListItemComponent, MyListItemFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    // feature specific
    AdvTodosRoutingModule,
    StoreModule.forFeature(fromTodos.todosFeatureKey, fromTodos.reducer),
    EffectsModule.forFeature([TodosEffects])
  ]
})
export class AdvTodosModule {
}
