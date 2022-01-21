import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay, map } from 'rxjs/operators';

const DELAY_IN_MS = 1200;

@Injectable()
export class FakeApiService {

  successfulRequest$(url: string, params = {}): Observable<object> {
    const response = {
      status: 'SUCCESS',
      url,
      params,
    };
    return of(response).pipe(
      tap(() => console.log('REQUEST (successful...)', url)),
      delay(DELAY_IN_MS),
      tap(() => console.log('RESPONSE (successful...)', url, response)),
    );
  }

  failedRequest$(url: string, errorMessage: string): Observable<object> {
    let callsCount = 0;
    return of(callsCount).pipe(
      tap(() => console.log(`Getting API...`, callsCount++)),
      delay(DELAY_IN_MS),
      map(() => {
        throw new Error(errorMessage);
      })
    );
  }
}
