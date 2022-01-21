import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { TodoFormData } from '@shared/my-todo-form/my-todo-form.component';
import { Todo, TodoParams } from '@api/models/todos.models';

import { actions, selectors } from '../../store/todos';
import { ExternalTodosWebsocketService } from '../../services/external-todos-websocket.service';
import { of } from 'rxjs';

@Component({
  selector: 'nts-adv-todos',
  templateUrl: './adv-todos.component.html',
  styleUrls: ['./adv-todos.component.css']
})
export class AdvTodosComponent implements OnInit, OnDestroy {

  todos$ = of([]);
  statuses$ = of([]);;
  isFetchingMany$ = of(true);

  constructor(
    private store: Store<any>,
    private externalTodosWs: ExternalTodosWebsocketService
  ) {
  }

  ngOnInit() {
    // TODO: load todos
  }

  handleRemove(todo: Todo) {
    // TODO: delete todo
  }

  handleEdit(todo: Todo) {
    // TODO: start editing
  }

  handleSaveEdit({ item, data }: any) {
    // TODO: optimistic update
  }

  handleCancelEdit(todo: Todo) {
    // TODO: end editing
  }

  handleCreateTodo(data: TodoFormData) {
    // TODO: create todo
  }

  handleStartExternalWS() {
    this.externalTodosWs.open();
  }

  handleStopExternalWS() {
    this.externalTodosWs.close();
  }

  ngOnDestroy(): void {
    this.externalTodosWs.destroy();
  }

}
