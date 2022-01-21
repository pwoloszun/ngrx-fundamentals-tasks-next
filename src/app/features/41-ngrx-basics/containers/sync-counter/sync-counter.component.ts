import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';

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

  value$ = this.store.pipe(
    select(selectors.selectCounterValue)
  );
  updatedAt$ = this.store.pipe(
    select(selectors.selectCounterUpdatedAt)
  );
  squareValue$ = this.store.pipe(
    select(selectors.selectCounterSquareValue)
  );

  constructor(private store: Store<any>) {
  }

  increment() {
    this.store.dispatch(actions.incrementCounter({
      incBy: 10,
      timestamp: Date.now()
    }));
  }

  decrement() {
    this.store.dispatch(actions.decrementCounter({
      decBy: 5,
      timestamp: Date.now()
    }));
  }

  reset() {
    this.store.dispatch(actions.resetCounter());
  }
}
