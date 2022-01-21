import { produce, Draft } from 'immer';
import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { RoomDetector } from '@api/room-temperature-api.service';

import * as actions from './room-detectors.actions';

export const roomDetectorsFeatureKey = 'roomDetectors';

export interface State extends EntityState<RoomDetector> {
  isManyLoading: boolean;
  isRunning: { [id: number]: boolean };
}

export interface ApplicationState {
  [roomDetectorsFeatureKey]: State; // IMPORTANT: prop name must equal featureName
}

export const adapter: EntityAdapter<RoomDetector> = createEntityAdapter<RoomDetector>();

export const initialState: State = adapter.getInitialState({
  isManyLoading: false,
  isRunning: {},
});

const roomDetectorsReducer = createReducer(
  initialState,
  on(actions.startSingleRoomTrackingSuccess, (state, { id }) => {
    return produce(state, (draftState: Draft<State>) => {
      draftState.isRunning[id] = true;
    });
  }),
  on(actions.stopSingleRoomTracking, (state, { id }) => {
    return produce(state, (draftState: Draft<State>) => {
      draftState.isRunning[id] = false;
    });
  }),
  on(actions.stopAllRoomsTracking, (state) => {
    return produce(state, (draftState: Draft<State>) => {
      draftState.isRunning = {};
    });
  }),

  on(actions.loadSingleRoomDetectorSuccess, (state, { roomDetectorUpdate }) => {
    return adapter.updateOne(roomDetectorUpdate, state);
  }),

  on(actions.loadManyRoomDetectorsRequest, (state, action) => {
    return produce(state, (draftState: Draft<State>) => {
      draftState.isManyLoading = true;
    });
  }),
  on(actions.loadManyRoomDetectorsSuccess, (state, action) => {
    const { roomDetectors } = action;
    const nextState = produce(state, (draftState: Draft<State>) => {
      draftState.isManyLoading = false;
    });
    return adapter.setAll(roomDetectors, nextState);
  }),
);

export function reducer(state: State | undefined, action: Action): State {
  return roomDetectorsReducer(state, action);
}
