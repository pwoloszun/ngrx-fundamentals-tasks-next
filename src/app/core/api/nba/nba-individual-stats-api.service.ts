import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { DataApiService } from '@api/data-api.service';

export interface NbaIndividualStats {
  id: number;
  player_id: number;
  pts: number;
  reb: number;
  ast: number;
  stl: number;
  blk: number;

  games_played: number;
  season: number;
  min: string;
  fgm: number;
  fga: number;
  fg3m: number;
  fg3a: number;
  ftm: number;
  fta: number;
  oreb: number;
  dreb: number;
  turnover: number;
  pf: number;
  fg_pct: number;
  fg3_pct: number;
  ft_pct: number;
}

@Injectable({
  providedIn: 'root'
})
export class NbaIndividualStatsApiService {
  private api = new DataApiService<NbaIndividualStats>(this.http, '/api/averages');

  constructor(private http: HttpClient) {
  }

  getPlayersStats$(playerIds: number[]): Observable<NbaIndividualStats[]> {
    return this.api.search({ player_id: playerIds.map((id) => '' + id) });
  }
}
