import { createReducer, on, Action } from '@ngrx/store';
import { produce } from 'immer';
import { cloneDeep } from 'lodash';

import * as actions from './counter.actions';

export const counterFeatureKey = 'gggHhh';

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
    const { incBy } = action;
    const nextState = produce(state, (draft) => {
      draft.value = state.value + incBy;
    });
    return nextState;
  }),

  on(actions.decrementCounter, (state, action) => {
    const { decBy, timestamp } = action;
    const nextState = produce(state, (draft) => {
      draft.value = state.value - decBy;
      draft.updatedAt = timestamp;
    });
    return nextState;
  }),

  // TODO 3: handle decrementCounter

  // TODO: handle resetCounter

);

export function reducer(state: SliceState | undefined, action: Action): SliceState {
  return counterReducer(state, action);
}

export interface ApplicationState {
  [counterFeatureKey]: SliceState; // IMPORTANT: prop name must equal featureName
}
