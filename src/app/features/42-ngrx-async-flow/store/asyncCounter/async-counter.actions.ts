import { createAction, props } from '@ngrx/store';

export enum AsyncCounterActionTypes {
  IncrementAsyncCounterRequest = '[AsyncCounter] Increment AsyncCounter Request',
  IncrementAsyncCounterSuccess = '[AsyncCounter] Increment AsyncCounter Success',

  DecrementAsyncCounterRequest = '[AsyncCounter] Decrement AsyncCounter Request',
  DecrementAsyncCounterSuccess = '[AsyncCounter] Decrement AsyncCounter Success',
}

export const incrementAsyncCounterRequest = createAction(
  AsyncCounterActionTypes.IncrementAsyncCounterRequest,
  props<{ incBy: number; }>()
);

export const incrementAsyncCounterSuccess = createAction(
  AsyncCounterActionTypes.IncrementAsyncCounterSuccess,
  props<{ value: number }>()
);

// TODO: decrementAsyncCounterRequest

// TODO: decrementAsyncCounterSuccess
