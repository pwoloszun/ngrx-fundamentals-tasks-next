import { createSelector } from '@ngrx/store';
import { find } from 'lodash';

import { ApplicationState, SliceState, counterFeatureKey } from './counter.reducer';

const selectFeature = (state: ApplicationState) => {
  return state[counterFeatureKey];
};

export const selectCounterValue_OLD = (state: ApplicationState) => {
  const stateSlice = selectFeature(state);
  return stateSlice.value;
};

export const selectCunterValueFactory = (n: number) => {
  return (state: ApplicationState) => {
    const value = selectCounterValue_OLD(state);
    return value * n;
  };
};

export const selectCounterValue = createSelector(
  [selectFeature],
  (stateSlice) => stateSlice.value
);

export const selectCounterUpdatedAt = (state: ApplicationState) => {
  const stateSlice = selectFeature(state);
  return stateSlice.updatedAt;
};

export const selectFormattedUpdatedAt = createSelector(
  [selectCounterUpdatedAt],
  (updatedAt) => {
    if (updatedAt !== null) {
      return new Date(updatedAt).toISOString();
    } else {
      return '';
    }
  }
);

// TODO
// export const selectFormattedUpdatedAt = null;

const selectUsers = (state: ApplicationState) => {
  return state[counterFeatureKey].users;
};

export const selectUserById = (id: number) => {
  return (state: ApplicationState) => {
    const users = selectUsers(state);
    return find(users, { id });
  };
};

export const selectUserById_MEM = (id: number) => {
  return createSelector(
    [selectUsers],
    (users) => find(users, { id })
  );
};
