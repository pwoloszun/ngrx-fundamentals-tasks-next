import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';

import { NbaPlayersApiService } from '@app/core/api/nba/nba-players-api.service';

const QUERY_MIN_LENGTH = 1;

@Component({
  selector: 'nts-smart-quick-search',
  templateUrl: './smart-quick-search.component.html',
  styleUrls: ['./smart-quick-search.component.css']
})
export class SmartQuickSearchComponent implements OnInit {

  searchCtrl = new FormControl('');

  isLoading = false;

  searchResults$ = this.searchCtrl.valueChanges.pipe(
    debounceTime(800),
    filter((q) => q.length >= QUERY_MIN_LENGTH),
    distinctUntilChanged(),
    tap(() => this.isLoading = true),
    switchMap((query) => this.playersApiService.searchPlayers(query)),
    tap(() => this.isLoading = false)
  );

  constructor(private playersApiService: NbaPlayersApiService) { }

  ngOnInit(): void {
  }

}
