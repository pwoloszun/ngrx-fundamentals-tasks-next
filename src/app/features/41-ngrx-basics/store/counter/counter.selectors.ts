import { createSelector } from '@ngrx/store';

import { ApplicationState, SliceState, counterFeatureKey } from './counter.reducer';

const selectFeature = (state: ApplicationState) => {
  return state[counterFeatureKey];
};

export const selectCounterValue = createSelector(
  selectFeature,
  (state: SliceState) => {
    return state.value;
  }
);

export const selectCounterSquareValue = createSelector(
  selectCounterValue,
  (value: number) => {
    return value ** 2;
  }
);

export const selectCounterUpdatedAt = createSelector(
  selectFeature,
  (state: SliceState) => state.updatedAt
);
