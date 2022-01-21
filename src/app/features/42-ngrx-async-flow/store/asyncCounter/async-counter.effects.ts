import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect, concatLatestFrom } from '@ngrx/effects';
import { select, Store, Action } from '@ngrx/store';
import { delay, exhaustMap, map, switchMap, mergeMap, withLatestFrom } from 'rxjs/operators';
'\'fnde? 6'
import * as actions from './async-counter.actions';
import * as selectors from './async-counter.selectors';
import { ApplicationState } from './async-counter.reducer';
import { EMPTY, forkJoin, of } from 'rxjs';

import { CounterValuesService } from '@api/counter-values.service';
import { CounterValue } from '@api/models/counter-value.models';

const DELAY_IN_MS = 1800;

@Injectable()
export class AsyncCounterEffects {

  private asyncCounterValue$ = this.store$.pipe(
    select(selectors.selectAsyncCounterValue)
  );

  incrementAsyncCounter$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.incrementAsyncCounterRequest),
      delay(DELAY_IN_MS),
      concatLatestFrom(() => this.asyncCounterValue$),
      map(([action, value]) => {
        const { incBy } = action;
        const nextValue = value + incBy;
        return actions.incrementAsyncCounterSuccess({ value: nextValue });
      })
      // TODO: error handling
    );
  });

  decrementAsyncCounter$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.decrementAsyncCounterRequest),
      // delay(DELAY_IN_MS),
      exhaustMap((action) => {
        const { id } = action;
        // console.log('concatLatestFrom action:', action,);
        return this.counterValuesService.find(id).pipe(
          map((counterEntity) => [action, counterEntity])
        );
      }),
      exhaustMap(([action, counterEntity]: any[]) => {
        const { id, decBy } = action;
        const params = {
          value: counterEntity.value - decBy,
        };
        // console.log('action:', action, ' cv:', counterEntity);
        return this.counterValuesService.update(id, params).pipe(
          map((updatedEntity) => actions.decrementAsyncCounterSuccess({ value: updatedEntity.value }))
        );
      })
      // TODO: error handling
    );
  });

  constructor(
    private actions$: Actions,
    private store$: Store<ApplicationState>,
    private counterValuesService: CounterValuesService,
  ) { }

}
