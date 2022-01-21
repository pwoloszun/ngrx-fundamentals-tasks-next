import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DataApiService } from '@api/data-api.service';

export interface NbaTeam {
  id: number;
  abbreviation: string;
  city: string;
  conference: string;
  division: string;
  full_name: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class NbaTeamsApiService {
  private api = new DataApiService<NbaTeam>(this.http, '/api/teams');

  constructor(private http: HttpClient) {
  }

  getAllTeams$(): Observable<NbaTeam[]> {
    return this.api.getAll();
  }

  getTeamByAbbr$(abbreviation: string): Observable<NbaTeam> {
    return this.api.search({ abbreviation }).pipe(
      map(([firstTeam]) => firstTeam)
    );
  }

  getTeamById$(id: number): Observable<NbaTeam> {
    return this.api.find(id);
  }
}
