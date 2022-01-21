import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';

import {
  actions,
  ApplicationState,
  selectors,
} from '../../store/counter';

@Component({
  selector: 'nts-sync-counter',
  templateUrl: './sync-counter.component.html',
  styleUrls: ['./sync-counter.component.css']
})
export class SyncCounterComponent {

  // TODO
  value$ = this.store.pipe(
    select((state: ApplicationState) => state.counter.value)
  );
  updatedAt$ = this.store.pipe(
    select((state: ApplicationState) => state.counter.updatedAt)
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
