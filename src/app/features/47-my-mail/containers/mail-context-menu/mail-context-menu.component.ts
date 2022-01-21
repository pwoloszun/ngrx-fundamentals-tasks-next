import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { timer, interval, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { SliceState, selectors, actions } from '../../store';

@Component({
  selector: 'nts-mail-context-menu',
  templateUrl: './mail-context-menu.component.html',
  styleUrls: ['./mail-context-menu.component.css']
})
export class MailContextMenuComponent implements OnInit, OnDestroy {

  // hasAnySelectedMessagesInCurrentCategory$ = interval(2000).pipe(
  //   take(2),
  //   map((i) => i % 2 > 0)
  // );
  hasAnySelectedMessagesInCurrentCategory$ = this.store.pipe(
    select(selectors.hasSelectedMessagesInCurrentCategory)
  );
  selectedMessagesInCurrentCategory$ = this.store.pipe(
    select(selectors.getSelectedMessagesInCurrentCategory)
  );
  notCurrentCategories$ = this.store.pipe(
    select(selectors.selectNotCurrentCategories)
  );
  private messageIds: number[] = [];
  private subscription!: Subscription;

  moveToCategoryHandler(categoryId: number) {
    const { messageIds } = this;
    const action = actions.changeMessageCategoryRequest({
      categoryId,
      messageIds
    });
    this.store.dispatch(action);
  }

  constructor(private store: Store<SliceState>) { }

  ngOnInit() {
    this.subscription = this.selectedMessagesInCurrentCategory$.subscribe((selectedMessageIds) => {
      this.messageIds = selectedMessageIds;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
