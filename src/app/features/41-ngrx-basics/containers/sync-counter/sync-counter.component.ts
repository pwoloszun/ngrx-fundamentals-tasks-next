import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';

import {
  actions,
  selectors,
} from '../../store/counter';

@Component({
  selector: 'nts-sync-counter',
  templateUrl: './sync-counter.component.html',
  styleUrls: ['./sync-counter.component.css']
})
export class SyncCounterComponent {

  // value$ = this.store.pipe(
  //   select(selectors.selectCounterValue)
  // );
  value$ = this.store.pipe(
    select(selectors.selectCunterValueFactory(10))
  );

  updatedAt$ = this.store.pipe(
    select(selectors.selectCounterUpdatedAt)
  );

  formattedUpdatedAt$ = this.store.pipe(
    select(selectors.selectFormattedUpdatedAt)
  );

  user$ = this.store.pipe(
    select(selectors.selectUserById_MEM(300))
  );

  squareValue$ = of(456);

  constructor(private store: Store<any>) { }

  increment() {
    const action = actions.incrementCounter({
      incBy: 10
    });
    this.store.dispatch(action);
  }

  decrement() {
    const decBy = 5;
    const timestamp = Date.now();
    const action = actions.decrementCounter({
      decBy,
      timestamp
    });
    this.store.dispatch(action);
  }

  reset() {
    // TODO
  }
}
