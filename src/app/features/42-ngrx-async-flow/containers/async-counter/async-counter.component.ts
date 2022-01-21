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
    // TODO: increment by 10
  }

  decrement() {
    // TODO: decrement by 5
  }

  reset() {
    // TODO
  }

}
