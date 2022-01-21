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

    it('should be initialized with defaults', (done) => {
      const store = createAsyncRefactoredCounterStore();

      const counterValue$ = store.pipe(
        select(selectors.selectAsyncCounterValue)
      );

      const expectedValue = 100;
      counterValue$.subscribe((value) => {
        expect(value).toEqual(expectedValue);
        done();
      });
    });

    it('should not be loading on init', (done) => {
      const store = createAsyncRefactoredCounterStore();

      const isLoadin$ = store.pipe(
        select(selectors.selectAsyncCounterIsLoading),
      );

      const expectedIsLoading = false;
      isLoadin$.subscribe((isLoading) => {
        expect(isLoading).toEqual(expectedIsLoading);
        done();
      });
    });
  });

  describe('async increment data flow', () => {
    it('should increment value', (done) => {
      const store = createAsyncRefactoredCounterStore();

      const incBy = 7;
      const initialValue = 100;
      const expectedInitialStateValues = { value: initialValue, isLoading: false };
      const expectedAfterIncrementRequestStateValues = { value: initialValue, isLoading: true };
      const expectedAfterIncrementSuccessStateValues = { value: initialValue + incBy, isLoading: false };

      const expectedStateSnapshots = [
        expectedInitialStateValues,
        expectedAfterIncrementRequestStateValues,
        expectedAfterIncrementSuccessStateValues
      ];

      const actualSelectorMapping = (state: ApplicationState) => {
        return {
          value: selectors.selectAsyncCounterValue(state),
          isLoading: selectors.selectAsyncCounterIsLoading(state),
        };
      };

      expectStateChanges(
        store,
        expectedStateSnapshots,
        actualSelectorMapping,
        done
      );

      const action = actions.incrementAsyncCounterRequest({ incBy });
      store.dispatch(action);
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
