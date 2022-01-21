import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Todo, TodoParams } from '@api/models/todos.models';


export enum TodosActionTypes {
  LoadManyTodosRequest = '[Todos] LoadManyTodosRequest',
  LoadManyTodosSuccess = '[Todos] LoadManyTodosSuccess',

  DeleteSingleTodoRequest = '[Todos] DeleteSingleTodoRequest',
  DeleteSingleTodoSuccess = '[Todos] DeleteSingleTodoSuccess',

  CreateTodoRequest = '[Todos] CreateTodoRequest',
  CreateTodoSuccess = '[Todos] CreateTodoSuccess',

  // TODO: update action types

  // TODO: edition action types

}

export const loadManyTodosRequest = createAction(
  TodosActionTypes.LoadManyTodosRequest,
);

export const loadManyTodosSuccess = createAction(
  TodosActionTypes.LoadManyTodosSuccess,
  // TODO
);

export const deleteSingleTodoRequest = createAction(
  TodosActionTypes.DeleteSingleTodoRequest,
  // TODO
);

export const deleteSingleTodoSuccess = createAction(
  TodosActionTypes.DeleteSingleTodoSuccess,
  // TODO
);


// TODO: update action types

// TODO: edition action types

export const createTodoRequest = createAction(
  TodosActionTypes.CreateTodoRequest,
  // TODO
);

export const createTodoSuccess = createAction(
  TodosActionTypes.CreateTodoSuccess,
  // TODO
);
