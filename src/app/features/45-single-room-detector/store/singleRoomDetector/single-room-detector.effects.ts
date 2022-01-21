import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { SingleRoomDetectorActionTypes, SingleRoomDetectorActions } from './single-room-detector.actions';



@Injectable()
export class SingleRoomDetectorEffects {


  @Effect()
  loadSingleRoomDetectors$ = this.actions$.pipe(
    ofType(SingleRoomDetectorActionTypes.LoadSingleRoomDetectors),
    /** An EMPTY observable only emits completion. Replace with your own observable API request */
    concatMap(() => EMPTY)
  );


  constructor(private actions$: Actions<SingleRoomDetectorActions>) {}

}
