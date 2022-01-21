import { createSelector } from '@ngrx/store';

import { adapter, ApplicationState, roomDetectorsFeatureKey } from './room-detectors.reducer';

const {
  selectIds,
  selectEntities,
  selectAll,
} = adapter.getSelectors();

const selectFeature = (state: ApplicationState) => {
  return state[roomDetectorsFeatureKey];
};

export const selectRoomDetectorsIsManyLoading = createSelector(
  selectFeature,
  (state) => state.isManyLoading,
);

export const selectRoomDetectorsIsRunning = createSelector(
  selectFeature,
  (state) => state.isRunning,
);

export const selectRoomDetectorsIds = createSelector(
  selectFeature,
  selectIds,
);

export const selectRoomDetectorsEntities = createSelector(
  selectFeature,
  selectEntities,
);

export const selectRoomDetectorsAll = createSelector(
  selectFeature,
  selectAll,
);
