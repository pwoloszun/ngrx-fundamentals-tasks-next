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
      // TODO
      // filter only actions of type: actions.incrementAsyncCounterRequest
      // delay
      // concat with asyncCounterValue$
      // calculate next value
      // dispatch SUCC action

      // TODO: error handling
    );
  }, { dispatch: false });

  // TODO: decrementAsyncCounter$
  //    fetch counterEntity using counterValuesService.find(id)
  //    update counterEntity using counterValuesService.update(id, {value: 456})

  constructor(
    private actions$: Actions,
    private store$: Store<ApplicationState>,
    private counterValuesService: CounterValuesService,
  ) { }

}
