import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { shuffle } from 'lodash';
import { company } from 'faker';

import { Todo, ITEM_STATUS } from '@api/models/todos.models';

import {
  actions,
  selectors,
} from '../store/todos';

const delayInSec = {
  create: 10,
  update: 4,
  delete: 14
};

@Injectable({
  providedIn: 'root'
})
export class ExternalTodosWebsocketService {
  private intervalId: any;

  private allTodos$ = this.store.pipe(
    select(selectors.selectTodosAll)
  );
  private allStatuses$ = this.store.pipe(
    select(selectors.selectTodosStatusesAll)
  );
  private notBlockedTodos$ = combineLatest([
    this.allTodos$,
    this.allStatuses$
  ]).pipe(
    map(([todos, statuses]) => {
      return todos.filter((todo, index) => {
        const status = statuses[index];
        return status === ITEM_STATUS.persisted;
      });
    })
  );

  private notBlocked: Todo[] = [];
  private subscription = this.notBlockedTodos$.subscribe((todos) => {
    this.notBlocked = todos;
  });

  constructor(private store: Store<any>) {
  }

  destroy() {
    this.close();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  open() {
    let i = 0;
    this.intervalId = setInterval(() => {
      i++;
      if (i % delayInSec.create === 0) {
        this.createFakeTodo();
      }

      if (i % delayInSec.update === 0) {
        this.updateFakeTodo();
      }

      if (i % delayInSec.delete === 0) {
        this.deleteFakeTodo();
      }
    }, 1000);
  }

  close() {
    clearInterval(this.intervalId);
  }

  private updateFakeTodo() {
    const { id } = shuffle(this.notBlocked)[0];
    const todoUpdate = {
      id,
      changes: this.generateTodoData()
    };
    this.store.dispatch(actions.optimisticUpdateSingleTodoRequest({
      todoUpdate
    }));
  }

  private createFakeTodo() {
    this.store.dispatch(actions.createTodoRequest({
      todoData: this.generateTodoData()
    }));
  }

  private deleteFakeTodo() {
    const { id } = shuffle(this.notBlocked)[0];
    this.store.dispatch(actions.deleteSingleTodoRequest({
      id
    }));
  }

  private generateTodoData() {
    return {
      title: company.companyName(),
      description: company.bsBuzz(),
    };
  }

}
