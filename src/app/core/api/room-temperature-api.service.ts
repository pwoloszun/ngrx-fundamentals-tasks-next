import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { reduce, map, keys } from 'lodash';

import { randomBetween, deriveNextID } from '@app/utils';

export interface RoomDetector {
  id: number;
  temperatures: number[];
  name: string;
}

interface RoomDetectorDictionary {
  [id: number]: RoomDetector;
}

const allRoomBaseResults: RoomDetectorDictionary = {
  100: { id: 100, temperatures: [23], name: 'single room' },
  200: { id: 200, temperatures: [21], name: '1st room' },
  201: { id: 201, temperatures: [28], name: '2nd room' },
  202: { id: 202, temperatures: [19], name: '3rd room' },
  203: { id: 203, temperatures: [31], name: '4th room' },
};

const previousTemperatures = reduce(allRoomBaseResults, (temperaturesMap, baseResult, id) => {
  temperaturesMap[id] = baseResult.temperatures[0];
  return temperaturesMap;
}, {} as any);

const DELAY_IN_MS = 800;

@Injectable()
export class RoomTemperatureApiService {
  temperatureFor(roomId: number): Observable<RoomDetector> {
    const baseResult = allRoomBaseResults[roomId];
    if (!baseResult) {
      throw new Error(`Undefined room ID: ${roomId}`);
    }
    const tempBase = baseResult.temperatures[0];
    const currentTemp = tempBase + randomBetween(-5, 7, true);
    const prevTemp = previousTemperatures[roomId];
    previousTemperatures[roomId] = currentTemp;
    const result: RoomDetector = {
      ...baseResult,
      temperatures: [currentTemp, prevTemp],
    };
    return of(result).pipe(
      delay(DELAY_IN_MS)
    );
  }

  getAll(): Observable<RoomDetector[]> {
    const ids = keys(allRoomBaseResults);
    const roomDetectorsList = map(ids, (id) => allRoomBaseResults[id as any]);
    return of(roomDetectorsList).pipe(
      delay(DELAY_IN_MS)
    );
  }

  create(name: string): Observable<RoomDetector> {
    const id = deriveNextID();
    const tempBase = randomBetween(17, 29, true);
    const createdRoomDetector: RoomDetector = {
      id,
      name,
      temperatures: [tempBase]
    };
    allRoomBaseResults[id] = createdRoomDetector;
    previousTemperatures[id] = tempBase;
    return of(createdRoomDetector).pipe(
      delay(DELAY_IN_MS)
    );
  }
}
