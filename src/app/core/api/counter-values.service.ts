import { Injectable } from '@angular/core';

import { DataApiService } from './data-api.service';
import { CounterValue } from './models/counter-value.models';

@Injectable()
export class CounterValuesService extends DataApiService<CounterValue> {
  getUrl(): string {
    return '/api/counter-values';
  }
}
