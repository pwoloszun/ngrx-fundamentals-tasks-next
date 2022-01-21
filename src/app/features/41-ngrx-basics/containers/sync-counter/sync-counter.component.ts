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
  updatedAt$ = of(123456789);
  squareValue$ = of(456);

  constructor(private store: Store<any>) { }

  increment() {
    // TODO
  }

  decrement() {
    // TODO
  }

  reset() {
    // TODO
  }
}
