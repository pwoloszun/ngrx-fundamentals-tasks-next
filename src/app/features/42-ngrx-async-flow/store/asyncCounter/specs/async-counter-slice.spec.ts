import { select } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';

import { createStore } from 'src/test/utils/create-store';
import { expectStateChanges } from 'src/test/utils/helpers';

import { CounterValuesService } from '@api/counter-values.service';

import {
  reducer,
  actions,
  ApplicationState,
  asyncCounterFeatureKey,
  selectors,
  effects,
} from '../index';
import { map } from 'rxjs/operators';

describe('AsyncCounterRefactored slice', () => {
  describe('initial value', () => {

    xit('should be initialized with defaults', (done) => {
    });

    xit('should not be loading on init', (done) => {
    });
  });

  describe('async increment data flow', () => {
    xit('should increment value', (done) => {
    });

    xit('should decrement value and update updatedAt', (done) => {
      // TODO
    });

  });
});

function createAsyncRefactoredCounterStore() {
  return createStore<ApplicationState>({
    reducers: {
      [asyncCounterFeatureKey]: reducer
    },
    effects: [effects.AsyncCounterEffects],
    providers: [CounterValuesService],
    imports: [HttpClientModule]
  });
}
