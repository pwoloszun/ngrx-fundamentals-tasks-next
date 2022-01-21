import { createAction, props } from '@ngrx/store';

export enum CounterActionTypes {
  IncrementCounter = '[Counter] Increment Counter',
  DecrementCounter = '[Counter] Decrement Counter',
  ResetCounter = '[Counter] Reset Counter',
}

export const incrementCounter = createAction(
  CounterActionTypes.IncrementCounter,
  // props<{ incBy: number; }>()
);

// TODO decrementCounter

// TODO resetCounter
