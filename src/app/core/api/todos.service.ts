import { Injectable } from '@angular/core';

import { DataApiService } from './data-api.service';
import { Todo } from './models/todos.models';

@Injectable()
export class TodosService extends DataApiService<Todo> {
  getUrl(): string {
    return '/api/todos';
  }
}
