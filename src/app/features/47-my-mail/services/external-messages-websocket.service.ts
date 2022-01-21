import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { shuffle } from 'lodash';
import { lorem, date } from 'faker';

import {
  actions,
  selectors,
  models,
  State
} from '../store';

const delayInSec = {
  create: 5,
  update: 4,
  delete: 14
};

@Injectable({
  providedIn: 'root'
})
export class ExternalMessagesWebsocketService {
  private intervalId: any;

  private allMessages$ = this.store.pipe(
    select(selectors.selectMessagesSorted)
  );
  private allCategories$ = this.store.pipe(
    select(selectors.selectCategories)
  );
  private categories: models.CategoryEntity[] = [];
  private subscriptions: Subscription[] = [];


  constructor(private store: Store<State>) {
    const sub = this.allCategories$.subscribe((categories) => {
      this.categories = categories;
    });
    this.subscriptions.push(sub);
  }

  destroy() {
    this.close();
  }

  open() {
    let i = 0;
    this.intervalId = setInterval(() => {
      i++;
      if (i % delayInSec.create === 0) {
        this.createFakeMessage();
      }

      if (i % delayInSec.delete === 0) {
        this.deleteRandomMessage();
      }
    }, 1000);
  }

  close() {
    clearInterval(this.intervalId);
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  private createFakeMessage() {
    const messageParams = this.generateMessageData();
    console.log('createFakeMessage', messageParams);
    this.store.dispatch(actions.createMessageRequest({
      messageParams
    }));
  }

  private deleteRandomMessage() {
    // const { id } = shuffle(this.notBlocked)[0];
    // this.store.dispatch(actions.deleteSingleTodoRequest({
    //   id
    // }));
  }

  private generateMessageData(): models.MessageParams {
    const categoryId = shuffle(this.categories)[0].id;
    return {
      title: lorem.word(),
      content: lorem.words(),
      createdAt: date.past().toJSON(),
      categoryId,
    };
  }

}
