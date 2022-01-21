import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { race, timer, NEVER } from 'rxjs';
import { delay, map, switchMap, tap, filter } from 'rxjs/operators';

import * as actions from './cancelable-mail.actions';

const TIME_TO_EXP = 3000;

@Injectable()
export class CancelableMailEffects {

  // this.snackBarRef = this.matSnackBar.open('Sending...', 'Cancel');
  // this.snackBarRef.onAction().subscribe(() => {
  //   // ...
  // });

  startSendMailFlow$ = createEffect(() => {
    return this.actions$.pipe(
      // TODO
      map(() => {
        return { type: 'TODO' };
      })
    );
  }, { dispatch: false });

  // ===
  // TODO: discover ALL other flows + impl


  private snackBarRef!: MatSnackBarRef<any>;

  constructor(
    private actions$: Actions,
    private matSnackBar: MatSnackBar,
    private store: Store<any>,
  ) { }

}
