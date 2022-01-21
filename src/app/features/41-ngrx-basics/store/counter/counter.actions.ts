import { createAction, props } from '@ngrx/store';

export enum CounterActionTypes {
  IncrementCounter = '[Counter] Increment Counter',
  DecrementCounter = '[Counter] Decrement Counter',
  ResetCounter = '[Counter] Reset Counter',
}

export const incrementCounter = createAction(
  CounterActionTypes.IncrementCounter,
  props<{ incBy: number; timestamp: number }>()
);

export const decrementCounter = createAction(
  CounterActionTypes.DecrementCounter,
  props<{ decBy: number; timestamp: number }>()
);

export const resetCounter = createAction(
  CounterActionTypes.ResetCounter,
);
