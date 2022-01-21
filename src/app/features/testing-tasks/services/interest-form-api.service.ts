import { Injectable } from '@angular/core';

import { DataApiService } from '@api/data-api.service';

export interface InterestFormDto {
  id: number;
  fullName: string;
  age: number;
  areDetailsEnabled: boolean;
  height: number | null;
  country: string;
  selectedInterestsMap: { [key: string]: boolean; }
}

export type InterestFormDtoParams = Omit<InterestFormDto, 'id'>;

@Injectable({
  providedIn: 'root'
})
export class InterestFormApiService extends DataApiService<InterestFormDto>{

  getUrl(): string {
    return '/api/interest-forms';
  }
}
