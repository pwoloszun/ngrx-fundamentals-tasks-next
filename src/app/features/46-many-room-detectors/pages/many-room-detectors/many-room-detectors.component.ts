import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { actions, ApplicationState, selectors } from '../../store/roomDetectors';

@Component({
  selector: 'nts-many-room-detectors',
  templateUrl: './many-room-detectors.component.html',
  styleUrls: ['./many-room-detectors.component.css']
})
export class ManyRoomDetectorsComponent implements OnInit {

  roomDetectors$ = this.store.pipe(
    select(selectors.selectRoomDetectorsAll),
  );
  isManyLoading$ = this.store.pipe(
    select(selectors.selectRoomDetectorsIsManyLoading),
  );

  constructor(private store: Store<ApplicationState>) {
  }

  ngOnInit() {
    this.store.dispatch(actions.loadManyRoomDetectorsRequest());
  }

  handleStart(id: number) {
    this.store.dispatch(actions.startSingleRoomTrackingRequest({ id }));
  }

  handleStop(id: number) {
    this.store.dispatch(actions.stopSingleRoomTracking({ id }));
  }

  handleStopAll() {
    this.store.dispatch(actions.stopAllRoomsTracking());
  }
}
