import { createSelector } from '@ngrx/store';

import { ApplicationState, SliceState, asyncCounterFeatureKey } from './async-counter.reducer';

const selectFeature = (state: ApplicationState) => {
  return state[asyncCounterFeatureKey];
};

export const selectAsyncCounterValue = createSelector(
  selectFeature,
  (state: SliceState) => {
    return state.asyncValue;
  }
);

export const selectAsyncCounterIsLoading = createSelector(
  selectFeature,
  (state: SliceState) => {
    return state.isLoading;
  }
);
