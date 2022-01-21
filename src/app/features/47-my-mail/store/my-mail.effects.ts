import { Injectable } from '@angular/core';
import { Store, select, Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, mergeMap, withLatestFrom, tap } from 'rxjs/operators';
import { EMPTY, of, from, combineLatest, Observable } from 'rxjs';
import { findIndex } from 'lodash';

import { MessagesApiService } from '../api/messages-api.service';
import { CategoriesApiService } from '../api/categories-api.service';

import * as MyMailActions from './my-mail.actions';
import { State } from './my-mail.reducer';
import { selectMessagesSorted, selectMessagesLoadedAt } from './my-mail.selectors';
import { hasExpired } from './helpers/has-expired';
import { MessageEntity } from './my-mail.models';

const MESSAGES_TTL = 2 * 60000;

@Injectable()
export class MyMailEffects {

  xx = this.store.select(() => 123);

  private loadedMessages$ = this.store.pipe(
    select(selectMessagesSorted)
  );

  private isMessagesCacheExpired$ = this.store.pipe(
    select(selectMessagesLoadedAt),
    map((loadedAt) => hasExpired(loadedAt, MESSAGES_TTL))
  );

  loadCategories$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MyMailActions.loadMyMailDataRequest),
      switchMap((action) => {
        return this.categoriesApi.getAll();
      }),
      map((categories) => MyMailActions.loadCategoriesSuccess({ categories })),
    );
  });

  loadMessages$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MyMailActions.loadMyMailDataRequest),
      withLatestFrom(this.isMessagesCacheExpired$, this.loadedMessages$),
      switchMap(([action, isCacheExpired, messages]) => {
        if (isCacheExpired) {
          return this.messagesApi.getAll();
        } else {
          return of(messages);
        }
      }),
      map((messages) => MyMailActions.loadMessagesSuccess(messages)),
      catchError((error) => of(MyMailActions.loadMessagesError({ error })))
    );
  });

  createMessage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MyMailActions.createMessageRequest),
      mergeMap((action) => {
        const { messageParams } = action;
        return this.messagesApi.create(messageParams);
      }),
      map((message) => MyMailActions.createMessageSuccess({ message })),
      catchError((error) => of(MyMailActions.createMessageError({ error })))
    );
  });

  moveMessagesToCategory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MyMailActions.changeMessageCategoryRequest),
      mergeMap((action) => {
        const { messageIds, categoryId } = action;
        const updates = messageIds.map((id) => ({ id, changes: { categoryId } }));
        return from(updates);
      }),
      mergeMap((update) => {
        const { id, changes } = update;
        return this.messagesApi.update(id, changes);
      }),
      map((message) => MyMailActions.createMessageSuccess({ message })),
      catchError((error) => of(MyMailActions.createMessageError({ error })))
    );
  });

  showMessageDetails$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MyMailActions.showMessageDetailsRequest),
      this.preloadMessagesTap(),
      withLatestFrom(this.loadedMessages$),
      map(([action, messages]) => {
        const { id } = action;
        const messageIds = this.calculateShowMessageIds(id, messages);
        return MyMailActions.showMessageDetailsSuccess(messageIds as any);
      })
    );
  });

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private categoriesApi: CategoriesApiService,
    private messagesApi: MessagesApiService
  ) { }


  private preloadMessagesTap() {
    return <T extends Action>(source$: Observable<T>): Observable<T> => {
      return source$.pipe(
        withLatestFrom(this.isMessagesCacheExpired$, this.loadedMessages$),
        switchMap(([action, isCacheExpired, messages]) => {
          let messages$ = of(messages);
          if (isCacheExpired) {
            messages$ = this.messagesApi.getAll();
          }
          return combineLatest([of(action), messages$]);
        }),
        tap(([action, messages]) => {
          const messagesLoadedAction = MyMailActions.loadMessagesSuccess(messages);
          this.store.dispatch(messagesLoadedAction);
        }),
        map(([action, messages]) => action)
      );
    };
  }

  private calculateShowMessageIds(id: number, messages: MessageEntity[]) {
    const index = findIndex(messages, (m) => m.id === id);
    let nextMessageId = null;
    let prevMessageId = null;
    if (index > 0) {
      prevMessageId = messages[index - 1].id;
    }
    if (index < messages.length - 1) {
      nextMessageId = messages[index + 1].id;
    }

    return {
      currentMessageId: id,
      nextMessageId,
      prevMessageId
    };
  }

}
