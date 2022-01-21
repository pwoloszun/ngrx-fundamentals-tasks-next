import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { concatMap, map, mergeMap, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Todo } from '@api/models/todos.models';
import { TodosService } from '@api/todos.service';

import * as actions from './todos.actions';
import { ApplicationState } from './todos.reducer';

@Injectable()
export class TodosEffects {

  loadManyTodos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.TodosActionTypes.LoadManyTodosRequest),
      mergeMap((action) => {
        return this.todosService.getAll();
      }),
      map((todos) => {
        return actions.loadManyTodosSuccess({ todos });
      })
    );
  });

  deleteSingleTodo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.TodosActionTypes.DeleteSingleTodoRequest),
      mergeMap((action) => {
        const { id } = action;
        return this.todosService.remove({ id, title: '' });
      }),
      map((id: number) => {
        return actions.deleteSingleTodoSuccess({ id });
      })
    );
  });

  createSingleTodo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.TodosActionTypes.CreateTodoRequest),
      concatMap((action) => {
        const { todoData } = action;
        const { title } = todoData;
        this.snackBarRef.open(`Creating Todo titled "${title}"`);
        return this.todosService.create(todoData);
      }),
      map((createdTodo: Todo) => {
        this.snackBarRef.dismiss();
        return actions.createTodoSuccess({ todo: createdTodo });
      })
    );
  });

  optimisticUpdateSingleTodo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.TodosActionTypes.OptimisticUpdateSingleTodoRequest),
      mergeMap((action) => {
        const { todoUpdate } = action;
        const { id, changes } = todoUpdate;
        return this.todosService.update(id, changes);
      }),
      map((todo: Todo) => {
        const todoUpdate = {
          id: todo.id,
          changes: todo,
        };
        return actions.optimisticUpdateSingleTodoSuccess({ todoUpdate });
      }),
    );
  });

  constructor(
    private actions$: Actions,
    private store$: Store<ApplicationState>,
    private todosService: TodosService,
    private snackBarRef: MatSnackBar,
  ) {
  }

}
