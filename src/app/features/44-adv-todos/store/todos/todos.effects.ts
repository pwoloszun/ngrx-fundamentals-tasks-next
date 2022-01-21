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
      // TODO
      ofType(actions.loadManyTodosRequest),
      map(() => {
        return { type: 'TODO' };
      })
    );
  }, { dispatch: false });

  // TODO
  // deleteSingleTodo$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     map(() => {
  //       return { type: 'TODO' };
  //     })
  //   );
  // }, { dispatch: false });


  // TODO
  // createSingleTodo$ = createEffect(() => {
  //   // TODO: snackBarRef.open(`Creating Todo titled "${title}"`);
  //   return this.actions$.pipe(
  //     // TODO
  //     map(() => {
  //       return { type: 'TODO' };
  //     })
  //   );
  // }, { dispatch: false });

  // TODO
  // optimisticUpdateSingleTodo$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     // TODO
  //   );
  // }, { dispatch: false });

  constructor(
    private actions$: Actions,
    private store$: Store<ApplicationState>,
    private todosService: TodosService,
    private snackBarRef: MatSnackBar,
  ) {
  }

}
