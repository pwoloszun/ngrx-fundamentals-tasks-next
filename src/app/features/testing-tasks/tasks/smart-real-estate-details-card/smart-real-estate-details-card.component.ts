import { Component, Input, OnInit } from '@angular/core';

import { RealEstatesApiService } from '@api/real-estates-api.service';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, filter, switchMap, startWith, map } from 'rxjs/operators';


@Component({
  selector: 'nts-smart-real-estate-details-card',
  templateUrl: './smart-real-estate-details-card.component.html',
  styleUrls: ['./smart-real-estate-details-card.component.css']
})
export class SmartRealEstateDetailsCardComponent implements OnInit {

  @Input()
  get entityId(): number | null {
    return this._entityId$.value;
  }
  set entityId(id: number | null) {
    this._entityId$.next(id);
  }
  private _entityId$ = new BehaviorSubject<number | null>(null);

  private idChanges$ = this._entityId$.pipe(
    filter((id) => id !== null),
    distinctUntilChanged()
  );

  readonly realEstate$ = this.idChanges$.pipe(
    switchMap((id) => this.realEstatesApiService.find(id as number)),
    startWith({} as any)
  );

  get status$() {
    return this.realEstatesApiService.status$;
  }

  get error$() {
    return this.realEstatesApiService.error$.pipe(
      map((err) => err?.message)
    );
  }

  constructor(private realEstatesApiService: RealEstatesApiService) { }

  ngOnInit(): void {
  }

}
