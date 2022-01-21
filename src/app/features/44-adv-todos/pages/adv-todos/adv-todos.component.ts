import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { TodoFormData } from '@shared/my-todo-form/my-todo-form.component';
import { Todo, TodoParams } from '@api/models/todos.models';

import { actions, selectors } from '../../store/todos';
import { ExternalTodosWebsocketService } from '../../services/external-todos-websocket.service';

@Component({
  selector: 'nts-adv-todos',
  templateUrl: './adv-todos.component.html',
  styleUrls: ['./adv-todos.component.css']
})
export class AdvTodosComponent implements OnInit, OnDestroy {

  todos$ = this.store.pipe(
    select(selectors.selectTodosAll),
  );
  statuses$ = this.store.pipe(
    select(selectors.selectTodosStatusesAll),
  );
  isFetchingMany$ = this.store.pipe(
    select(selectors.selectTodosIsFetchingMany),
  );

  constructor(
    private store: Store<any>,
    private externalTodosWs: ExternalTodosWebsocketService
  ) {
  }

  ngOnInit() {
    this.store.dispatch(actions.loadManyTodosRequest());
  }

  ngOnDestroy(): void {
    this.externalTodosWs.destroy();
  }

  handleRemove(todo: Todo) {
    this.store.dispatch(actions.deleteSingleTodoRequest({ id: todo.id }));
  }

  handleEdit(todo: Todo) {
    this.store.dispatch(actions.startEditSingleTodo({ id: todo.id }));
  }

  handleSaveEdit({ item, data }: any) {
    const { id } = item;
    const todoUpdate = {
      id,
      changes: data,
    };
    this.store.dispatch(actions.optimisticUpdateSingleTodoRequest({ todoUpdate }));
  }

  handleCancelEdit(todo: Todo) {
    this.store.dispatch(actions.endEditSingleTodo({ id: todo.id }));
  }

  handleCreateTodo(data: TodoFormData) {
    const { title, description } = data;
    this.store.dispatch(actions.createTodoRequest({
      todoData: { title, description }
    }));
  }

  handleStartExternalWS() {
    this.externalTodosWs.open();
  }

  handleStopExternalWS() {
    this.externalTodosWs.close();
  }
}
