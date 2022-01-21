import { createAction, props } from '@ngrx/store';

export enum CounterActionTypes {
  IncrementCounter = '[Counter] Increment Counter',
  DecrementCounter = '[Counter] Decrement Counter',
  ResetCounter = '[Counter] Reset Counter',
}

export const incrementCounter = createAction(
  CounterActionTypes.IncrementCounter,
  props<{ incBy: number; }>()
);

// TODO 1 decrementCounter
export const decrementCounter = createAction(
  CounterActionTypes.DecrementCounter,
  props<{ decBy: number; timestamp: number; }>()
);

// TODO resetCounter
