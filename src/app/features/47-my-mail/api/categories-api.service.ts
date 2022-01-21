import { Injectable } from '@angular/core';

import { DataApiService } from '@api/data-api.service';

import { CategoryEntity } from '../store/my-mail.models';

@Injectable({
  providedIn: 'root'
})
export class CategoriesApiService extends DataApiService<CategoryEntity> {

  getUrl(): string {
    return '/api/categories';
  }

}
