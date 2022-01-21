import { Injectable } from '@angular/core';

import { Hero } from './models/hero.model';
import { DataApiService } from './data-api.service';

@Injectable()
export class HeroesService extends DataApiService<Hero> {
  getUrl(): string {
    return '/api/heroes';
  }
}
