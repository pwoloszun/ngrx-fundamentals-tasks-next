import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { combineLatest, Observable, of, range, interval } from 'rxjs';
import { map, mergeMap, reduce, tap, take } from 'rxjs/operators';


// https://www.balldontlie.io/#getting-started

interface NbaResponse {
  data: object[];
  meta: object;
}

@Injectable({
  providedIn: 'root'
})
export class BallDontLieApiService {

  constructor(private http: HttpClient) { }

  getAllTeams$(): Observable<object[]> {
    return this.http.get('https://www.balldontlie.io/api/v1/teams').pipe(
      map((response: NbaResponse) => response.data)
    );
  }

  getAllPlayers$(page = 0, perPage = 30): Observable<any[]> {
    const params = {
      page: '' + page,
      per_page: '' + perPage
    };
    return this.http.get('https://www.balldontlie.io/api/v1/players', {
      params
    }).pipe(
      map((resp: NbaResponse) => resp.data)
    );
  }

  getAverages$(ids: number[], season = 2018): Observable<any[]> {
    const params = {
      'player_ids[]': ids.map((id) => '' + id),
      season: '' + season
    };
    return this.http.get('https://www.balldontlie.io/api/v1/season_averages', {
      params
    }).pipe(
      map((resp: NbaResponse) => resp.data)
    );
  }

  run() {
    const pages = [0, 1, 2, 3, 28, 29, 30, 31, 32, 33, 34];
    const perPage = 100;

    return interval(2000).pipe(
      take(pages.length),
      map((i) => pages[i]),
      mergeMap((pageNo) => {
        console.log('page no', pageNo);
        return this.getAllPlayers$(pageNo, perPage);
      }),
      mergeMap((players: any[]) => {
        const ids = players.map((p) => p.id);
        return combineLatest([
          of(players),
          this.getAverages$(ids)
        ]);
      }),
      map(([players, averages]) => {
        console.log('ps count', players.length, 'avgs count', averages.length);

        const avgPlayerIds = averages.map((avg) => avg.player_id);
        const playrsWithStats = players.filter(({ id }) => avgPlayerIds.includes(id));
        return [playrsWithStats, averages];
      }),
      map(([players, averages]) => {
        const normalizedPlayers = players.map((p) => {
          p.team_id = p.team.id;
          delete p.team;
          return p;
        });
        return [normalizedPlayers, averages];
      }),
      reduce((acc, [players, averages]) => {
        return [
          acc[0].concat(players),
          acc[1].concat(averages),
        ];
      })
    );

  }
}
