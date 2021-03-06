import { Action, createReducer, on } from '@ngrx/store';
import { produce } from 'immer';

import * as actions from './async-counter.actions';

export const asyncCounterFeatureKey = 'asyncCounter';

export interface SliceState {
  asyncValue: number;
  isLoading: boolean;
}

export const initialState: SliceState = {
  asyncValue: 100,
  isLoading: false,
};

// App STATE
export interface ApplicationState {
  [asyncCounterFeatureKey]: SliceState; // IMPORTANT: prop name must equal featureName
}

const asyncCounterReducer = createReducer(
  initialState,

  on(actions.incrementAsyncCounterRequest, (state) => {
    // TODO
    return state;
  }),

  on(actions.incrementAsyncCounterSuccess, (state, action) => {
    // TODO
    return state;
  }),

  // TODO decrement: REQ + SUCC

);

export function reducer(state: SliceState | undefined, action: Action): SliceState {
  return asyncCounterReducer(state, action);
}
