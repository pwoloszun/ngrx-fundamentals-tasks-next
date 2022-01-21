import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

const DELAY_IN_MS = 2400;

@Injectable()
export class SearchApiService {

  querySearch$(query: string): Observable<string[]> {
    const results = [
      query,
      `Another ${query}`
    ];
    const count = Math.floor(Math.random() * 5);
    for (let i = 0; i < count; i++) {
      results.push(`${query} ${Math.random()}`);
    }
    return of(results).pipe(
      tap(() => console.log(`REQUEST ${query}`)),
      delay(DELAY_IN_MS),
      tap(() => console.log(`RESPONSE ${query}, results count: ${results.length}`))
    );
  }

}
