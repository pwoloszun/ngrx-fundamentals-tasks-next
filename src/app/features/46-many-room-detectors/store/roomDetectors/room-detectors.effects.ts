import { Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { concat, interval, of, race, Observable } from 'rxjs';
import { mergeMap, map, takeUntil, filter, withLatestFrom } from 'rxjs/operators';

import { RoomDetector, RoomTemperatureApiService } from '@api/room-temperature-api.service';

import * as actions from './room-detectors.actions';
import * as selectors from './room-detectors.selectors';
import { ApplicationState } from './room-detectors.reducer';

const SYNC_FRAME_IN_MS = 2600;

function stopSyncingRoom$(id: number, action$: Observable<Action>) {
  const stopAll$ = action$.pipe(
    ofType(actions.RoomDetectorsActionTypes.StopAllRoomsTracking)
  );

  const stopByRoomId$ = action$.pipe(
    ofType(actions.RoomDetectorsActionTypes.StopSingleRoomTracking),
    filter((action) => {
      const actualId = (action as any).id;
      return actualId === id;
    })
  );

  return race(
    stopAll$,
    stopByRoomId$,
  );
}

function fetchRoomTemperature$(roomTemperatureApiService: RoomTemperatureApiService, id: number) {
  const preRequest$ = of(actions.loadSingleRoomDetectorRequest({ id }));

  const request$ = roomTemperatureApiService
    .temperatureFor(id)
    .pipe(
      map((roomDetector: RoomDetector) => {
        const roomDetectorUpdate = {
          id: roomDetector.id,
          changes: roomDetector,
        };
        return actions.loadSingleRoomDetectorSuccess({ roomDetectorUpdate });
      }),
    );

  return concat(
    preRequest$,
    request$
  );
}

function syncRoomTemperatureTask$(
  roomTemperatureApiService: RoomTemperatureApiService,
  id: number,
  action$: Observable<Action>
) {
  const syncingStarted$ = of(actions.startSingleRoomTrackingSuccess({ id }));
  const syncingTask$ = interval(SYNC_FRAME_IN_MS).pipe(
    takeUntil(stopSyncingRoom$(id, action$)),
    mergeMap(() => {
      return fetchRoomTemperature$(roomTemperatureApiService, id);
    }),
  );

  return concat(
    syncingStarted$,
    syncingTask$
  );
}

@Injectable()
export class RoomDetectorsEffects {
  private isRunning$ = this.store$.pipe(
    select(selectors.selectRoomDetectorsIsRunning),
  );

  @Effect()
  loadManyRoomDetectors$ = this.actions$.pipe(
    ofType(actions.RoomDetectorsActionTypes.LoadManyRoomDetectorsRequest),
    mergeMap((action) => {
      return this.roomTemperatureApiService.getAll();
    }),
    map((roomDetectors: RoomDetector[]) => {
      return actions.loadManyRoomDetectorsSuccess({ roomDetectors });
    }),
  );

  @Effect()
  startSingleRoomTracking$ = this.actions$.pipe(
    ofType(actions.RoomDetectorsActionTypes.StartSingleRoomTrackingRequest),
    withLatestFrom(this.isRunning$),
    filter(([action, isRunning]) => {
      const { id } = action;
      return !isRunning[id];
    }),
    mergeMap(([action]) => {
      const { id } = action;
      return syncRoomTemperatureTask$(
        this.roomTemperatureApiService,
        id,
        this.actions$
      );
    }),
  );

  constructor(
    private actions$: Actions,
    private store$: Store<ApplicationState>,
    private roomTemperatureApiService: RoomTemperatureApiService,
  ) {
  }

}
