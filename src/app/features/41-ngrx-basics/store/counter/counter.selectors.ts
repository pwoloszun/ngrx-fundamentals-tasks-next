import { createSelector } from '@ngrx/store';

import { ApplicationState, SliceState, counterFeatureKey } from './counter.reducer';

const selectFeature = (state: ApplicationState) => {
  return state[counterFeatureKey];
};

export const selectCounterValue_OLD = (state: ApplicationState) => {
  const stateSlice = selectFeature(state);
  return stateSlice.value;
};

export const selectCounterValue = createSelector(
  [selectFeature],
  (stateSlice) => stateSlice.value
);

export const selectCounterUpdatedAt = (state: ApplicationState) => {
  const stateSlice = selectFeature(state);
  return stateSlice.updatedAt;
};

// TODO
// export const selectFormattedUpdatedAt = null;
