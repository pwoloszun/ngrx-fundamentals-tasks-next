
import { SingleRoomDetectorActions, SingleRoomDetectorActionTypes } from './single-room-detector.actions';

export const singleRoomDetectorFeatureKey = 'singleRoomDetector';

export interface State {

}

export const initialState: State = {

};

export function reducer(state = initialState, action: SingleRoomDetectorActions): State {
  switch (action.type) {

    case SingleRoomDetectorActionTypes.LoadSingleRoomDetectors:
      return state;

    default:
      return state;
  }
}
