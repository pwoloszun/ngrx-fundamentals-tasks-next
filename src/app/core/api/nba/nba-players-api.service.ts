import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { DataApiService } from '@api/data-api.service';

export interface NbaPlayer {
  id: number;
  team_id: number;
  first_name: string;
  last_name: string;
  position: string;
  height_feet: number | null;
  height_inches: number | null;
  weight_pounds: number | null;
}

@Injectable({
  providedIn: 'root',
})
export class NbaPlayersApiService {

  private api = new DataApiService<NbaPlayer>(this.http, '/api/players');

  constructor(private http: HttpClient) {
  }

  getAllPlayers$(): Observable<NbaPlayer[]> {
    return this.api.getAll();
  }

  getTeamRosterBy$(teamId: number): Observable<NbaPlayer[]> {
    return this.api.search({ team_id: '' + teamId });
  }

  getPlayer$(playerId: number): Observable<NbaPlayer> {
    return this.api.find(playerId);
  }

  searchPlayers(q: string): Observable<NbaPlayer[]> {
    return this.api.search({ q });
  }
}
