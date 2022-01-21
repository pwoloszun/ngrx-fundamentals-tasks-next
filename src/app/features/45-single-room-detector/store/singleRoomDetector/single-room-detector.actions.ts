import { Action } from '@ngrx/store';

export enum SingleRoomDetectorActionTypes {
  LoadSingleRoomDetectors = '[SingleRoomDetector] Load SingleRoomDetectors',
  
  
}

export class LoadSingleRoomDetectors implements Action {
  readonly type = SingleRoomDetectorActionTypes.LoadSingleRoomDetectors;
}


export type SingleRoomDetectorActions = LoadSingleRoomDetectors;
