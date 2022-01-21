import { createSelector } from '@ngrx/store';

import { ApplicationState, SliceState, counterFeatureKey } from './counter.reducer';

const selectFeature = (state: ApplicationState) => {
  return state[counterFeatureKey];
};

export const selectCounterValue = (state: ApplicationState) => {
  return state.counter.value;
};

export const selectCounterUpdatedAt = (state: ApplicationState) => {
  return state.counter.updatedAt;
};

// TODO
// export const selectFormattedUpdatedAt = null;
