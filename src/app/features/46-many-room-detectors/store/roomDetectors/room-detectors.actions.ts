import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { RoomDetector } from '@api/room-temperature-api.service';

export enum RoomDetectorsActionTypes {
  StartSingleRoomTrackingRequest = '[RoomDetectors] StartSingleRoomTrackingRequest',
  StartSingleRoomTrackingSuccess = '[RoomDetectors] StartSingleRoomTrackingSuccess',

  StopSingleRoomTracking = '[RoomDetectors] StopSingleRoomTracking',

  StopAllRoomsTracking = '[RoomDetectors] StopAllRoomsTracking',

  LoadManyRoomDetectorsRequest = '[RoomDetectors] LoadManyRoomDetectorsRequest',
  LoadManyRoomDetectorsSuccess = '[RoomDetectors] LoadManyRoomDetectorsSuccess',

  LoadSingleRoomDetectorRequest = '[RoomDetectors] LoadSingleRoomDetectorRequest',
  LoadSingleRoomDetectorSuccess = '[RoomDetectors] LoadSingleRoomDetectorSuccess',

}

export const startSingleRoomTrackingRequest = createAction(
  RoomDetectorsActionTypes.StartSingleRoomTrackingRequest,
  props<{ id: number }>()
);

export const startSingleRoomTrackingSuccess = createAction(
  RoomDetectorsActionTypes.StartSingleRoomTrackingSuccess,
  props<{ id: number }>()
);

export const stopSingleRoomTracking = createAction(
  RoomDetectorsActionTypes.StopSingleRoomTracking,
  props<{ id: number }>()
);

export const stopAllRoomsTracking = createAction(
  RoomDetectorsActionTypes.StopAllRoomsTracking,
);

export const loadSingleRoomDetectorRequest = createAction(
  RoomDetectorsActionTypes.LoadSingleRoomDetectorRequest,
  props<{ id: number }>()
);

export const loadSingleRoomDetectorSuccess = createAction(
  RoomDetectorsActionTypes.LoadSingleRoomDetectorSuccess,
  props<{ roomDetectorUpdate: Update<RoomDetector> }>()
);

export const loadManyRoomDetectorsRequest = createAction(
  RoomDetectorsActionTypes.LoadManyRoomDetectorsRequest,
);

export const loadManyRoomDetectorsSuccess = createAction(
  RoomDetectorsActionTypes.LoadManyRoomDetectorsSuccess,
  props<{ roomDetectors: RoomDetector[] }>()
);
