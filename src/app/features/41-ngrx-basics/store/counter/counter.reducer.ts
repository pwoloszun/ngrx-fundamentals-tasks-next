import { createReducer, on, Action } from '@ngrx/store';
import { produce } from 'immer';

import * as actions from './counter.actions';

export const counterFeatureKey = 'counter';

// design state shape
export interface SliceState {
  value: number;
  updatedAt: number | null;
}

export const initialState: SliceState = {
  value: 997,
  updatedAt: null,
};


// ==========
const counterReducer = createReducer(
  initialState,

  on(actions.incrementCounter, (state, action) => {
    // TODO
    const nextState = {};
    return state;
  }),

  // TODO: handle decrementCounter

  // TODO: handle resetCounter

);

export function reducer(state: SliceState | undefined, action: Action): SliceState {
  return counterReducer(state, action);
}

export interface ApplicationState {
  [counterFeatureKey]: SliceState; // IMPORTANT: prop name must equal featureName
}
