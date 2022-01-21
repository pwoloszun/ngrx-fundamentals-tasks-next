import { createReducer, on, Action } from '@ngrx/store';
import { produce } from 'immer';

import * as actions from './counter.actions';

export const counterFeatureKey = 'counter';

export interface SliceState {
  value: number;
  updatedAt: number | null;
}

export const initialState: SliceState = {
  value: 0,
  updatedAt: null,
};

// App STATE
export interface ApplicationState {
  [counterFeatureKey]: SliceState; // IMPORTANT: prop name must equal featureName
}

const counterReducer = createReducer(
  initialState,

  on(actions.incrementCounter, (state, action) => {
    const { incBy, timestamp } = action;
    return produce(state, (draftState) => {
      draftState.value += incBy;
      draftState.updatedAt = timestamp;
    });
  }),

  on(actions.decrementCounter, (state, action) => {
    const { decBy, timestamp } = action;
    return produce(state, (draftState) => {
      draftState.value -= decBy;
      draftState.updatedAt = timestamp;
    });
  }),

  on(actions.resetCounter, (state) => {
    return produce(state, (draftState) => {
      draftState.value = initialState.value;
      draftState.updatedAt = initialState.updatedAt;
    });
  }),
);

export function reducer(state: SliceState | undefined, action: Action): SliceState {
  return counterReducer(state, action);
}
