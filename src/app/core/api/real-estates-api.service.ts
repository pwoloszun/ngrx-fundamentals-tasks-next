import { Injectable } from '@angular/core';

import { DataApiService } from './data-api.service';
import { RealEstate } from './models/real-estate.model';

@Injectable()
export class RealEstatesApiService extends DataApiService<RealEstate> {
  getUrl(): string {
    return '/api/real-estates';
  }
}
