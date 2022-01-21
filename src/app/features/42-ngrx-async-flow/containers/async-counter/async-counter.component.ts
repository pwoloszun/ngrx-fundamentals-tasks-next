import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { selectors, actions } from '../../store/asyncCounter';

@Component({
  selector: 'nts-async-counter',
  templateUrl: './async-counter.component.html',
  styleUrls: ['./async-counter.component.css']
})
export class AsyncCounterComponent {

  id = 100; // DB entity ID

  value$ = this.store.pipe(
    select(selectors.selectAsyncCounterValue)
  );
  isLoading$ = this.store.pipe(
    select(selectors.selectAsyncCounterIsLoading)
  );

  constructor(private store: Store<any>) { }

  increment() {
    const action = actions.incrementAsyncCounterRequest({
      incBy: 20
    });
    this.store.dispatch(action);
  }

  decrement() {
    const action = actions.decrementAsyncCounterRequest({
      id: this.id,
      decBy: 5
    });
    this.store.dispatch(action);
  }

  reset() {
    // TODO
  }

}
