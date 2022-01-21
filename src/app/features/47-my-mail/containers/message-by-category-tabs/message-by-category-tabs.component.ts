import { Component, OnInit } from '@angular/core';
import { of, Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { models, SliceState, selectors, actions } from '../../store';

@Component({
  selector: 'nts-message-by-category-tabs',
  templateUrl: './message-by-category-tabs.component.html',
  styleUrls: ['./message-by-category-tabs.component.css']
})
export class MessageByCategoryTabsComponent implements OnInit {

  // categories$ = of([
  //   { id: 1, text: 'Primary', value: 'primary' },
  //   { id: 2, text: 'Offers', value: 'offers' },
  //   { id: 3, text: 'Notifications', value: 'notifications' },
  // ]);
  categories$ = this.store.pipe(
    select(selectors.selectCategories)
  );

  // tabSelectedIndex$ = of(1).pipe(delay(2000));
  tabSelectedIndex$ = this.store.pipe(
    select(selectors.selectCurrentCategoryIndex)
  );

  // allMessages$ = of([
  //   { id: 100, title: 'qqq', content: 'gggg', categoryId: 1 },
  //   { id: 200, title: 'imba', content: 'imb', categoryId: 1 },
  //   { id: 300, title: 'aa', content: 'a', categoryId: 1 },
  //   { id: 400, title: 'r', content: 'rrr', categoryId: 1 },

  //   { id: 1000, title: 'batman', content: 'lorem ips', categoryId: 2 },
  //   { id: 2000, title: 'spider-man', content: 'smth', categoryId: 2 },
  //   { id: 4000, title: 'bob', content: 'smith', categoryId: 2 },

  //   { id: 10, title: 'js weekly', content: 'js lorem ips', categoryId: 3 },
  //   { id: 30, title: 'jQuery', content: 'jq lorem', categoryId: 3 },
  //   { id: 40, title: 'angular', content: 'ng lorem', categoryId: 3 }
  // ]);
  allMessages$ = this.store.pipe(
    select(selectors.selectMessagesSorted)
  );

  // private selectedMessagesIdsMap$ = {
  //   primary: of([100, 200]),
  //   offers: of([]),
  //   notifications: of([30])
  // };

  private iconsMap: any = {
    primary: 'inbox',
    offers: 'local_offer',
    notifications: 'info'
  };

  constructor(private store: Store<SliceState>) { }

  selectMessageHandler(category: models.CategoryEntity, selectedIds: number[]) {
    // console.log('selected ids', selectedIds);
    const action = actions.selectCategoryMessages({
      categoryId: category.id,
      messageIds: selectedIds
    });
    this.store.dispatch(action);
  }

  getIconBy(category: models.CategoryEntity): string {
    return this.iconsMap[category.value];
  }

  getUnreadCountBy$(category: models.CategoryEntity): Observable<number> {
    return this.store.pipe(
      select(selectors.selectCategoryUnreadCount, { categoryId: category.id })
    );
  }

  getTotalCountBy$(category: models.CategoryEntity): Observable<number> {
    return this.store.pipe(
      select(selectors.selectCategoryTotalCount, { categoryId: category.id })
    );
  }

  getMessagesBy$(category: models.CategoryEntity): Observable<models.MessageEntity[]> {
    return this.store.pipe(
      select(selectors.selectMessagesByCategory, { categoryId: category.id })
    );
  }

  getSelectedMessageIdsBy$(category: models.CategoryEntity): Observable<number[]> {
    return this.store.pipe(
      select(selectors.getSelectedMessagesByCategory, { categoryId: category.id })
    );
  }

  categoryChangeHandler(index: number) {
    const action = actions.changeCategoryByIndex({ index });
    this.store.dispatch(action);
  }

  ngOnInit() {
    const action = actions.loadMyMailDataRequest();
    this.store.dispatch(action);
  }
}
