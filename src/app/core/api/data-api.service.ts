import { Injectable, Optional, Inject, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, NEVER } from 'rxjs';
import { delay, map, tap, catchError } from 'rxjs/operators';

import { getDelay } from './get-delay';

const delayInMs = getDelay();

export interface SearchParams {
  [param: string]: string | string[];
}

export type DataApiUrl = string;

export const DATA_API_URL = new InjectionToken<DataApiUrl>('DataApiUrl');

export enum RequestStatus {
  Idle = 'IDLE',
  Pending = 'PENDING',
  Success = 'SUCCESS',
  Error = 'ERROR',
}

@Injectable()
export class DataApiService<T extends { id: number }> {

  readonly status$ = new BehaviorSubject(RequestStatus.Idle);
  readonly error$ = new BehaviorSubject<Error | null>(null); // TODO

  constructor(
    private http: HttpClient,
    @Optional() @Inject(DATA_API_URL) private url: DataApiUrl
  ) { }

  find(id: number): Observable<T> {
    this.status$.next(RequestStatus.Pending);
    return this.http.get<T>(this.getSingleUrl({ id }))
      .pipe(
        delay(delayInMs),
        tap(() => this.status$.next(RequestStatus.Success)),
        catchError((err) => {
          this.status$.next(RequestStatus.Error);
          this.error$.next(err);
          return NEVER;
        })
      );
  }

  search(params: SearchParams): Observable<T[]> {
    this.status$.next(RequestStatus.Pending);
    return this.http.get<T[]>(this.getUrl(), { params })
      .pipe(
        delay(delayInMs),
        tap(() => this.status$.next(RequestStatus.Success)),
      );
  }

  update(id: number, changes: Partial<T>): Observable<T> {
    this.status$.next(RequestStatus.Pending);
    return this.http.put(this.getSingleUrl({ id }), changes)
      .pipe(
        map((o: object) => o as T),
        delay(delayInMs),
        tap(() => this.status$.next(RequestStatus.Success)),
      );
  }

  remove(entity: T): Observable<number> {
    const { id } = entity;
    this.status$.next(RequestStatus.Pending);
    return this.http.delete(this.getSingleUrl(entity))
      .pipe(
        map(() => id),
        delay(delayInMs),
        tap(() => this.status$.next(RequestStatus.Success)),
      );
  }

  create(entity: any): Observable<T> {
    this.status$.next(RequestStatus.Pending);
    return this.http.post(this.getUrl(), entity)
      .pipe(
        map((o: object) => o as T),
        delay(delayInMs),
        tap(() => this.status$.next(RequestStatus.Success)),
      );
  }

  getAll(): Observable<T[]> {
    this.status$.next(RequestStatus.Pending);
    return this.http.get<T[]>(this.getUrl()).pipe(
      delay(delayInMs),
      tap(() => this.status$.next(RequestStatus.Success)),
    );
  }

  getUrl(): string {
    if (!this.url || this.url.length < 1) {
      throw new Error('Abstract method');
    }
    return this.url;
  }

  setUrl(url: string): void {
    this.url = url;
  }

  private getSingleUrl({ id }: { id: number; }): string {
    return `${this.getUrl()}/${id}`;
  }

}
