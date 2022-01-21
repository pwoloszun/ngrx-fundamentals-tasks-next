import { select } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { createStore } from 'src/test/utils/create-store';

import { reducer, counterFeatureKey, selectors, ApplicationState, actions } from '../index';

describe('Counter slice', () => {
  describe('initial value', () => {
    it('should set initial value to 0', (done) => {
      const store = createCounterStore();

      const counterValue$ = store.pipe(
        select(selectors.selectCounterValue)
      );

      const expectedValue = 0;
      counterValue$.subscribe((value) => {
        expect(value).toEqual(expectedValue);
        done();
      });
    });

    it('should set initial updatedAt to null', (done) => {
      const store = createCounterStore();

      const expectedUpdatedAt = null;
      const counterUpdatedAt$ = store.pipe(
        select(selectors.selectCounterUpdatedAt)
      );

      counterUpdatedAt$.subscribe((value) => {
        expect(value).toEqual(expectedUpdatedAt);
        done();
      });
    });
  });

  describe('IncrementCounter action', () => {
    it('should increment value and update updatedAt', (done) => {
      const store = createCounterStore();

      const incBy = 5;
      const timestamp = 12345678;

      const action = actions.incrementCounter({ incBy, timestamp });
      store.dispatch(action);

      const actualState$ = store.pipe(
        map((state) => {
          return {
            value: selectors.selectCounterValue(state),
            updatedAt: selectors.selectCounterUpdatedAt(state),
          };
        }),
      );

      const expectedState = { value: incBy, updatedAt: timestamp };
      actualState$.subscribe((stateSnapshot) => {
        expect(stateSnapshot).toEqual(expectedState);
        done();
      });

    });

    xit('should decrement value and update updatedAt', (done) => {
      // TODO
    });

  });
});

function createCounterStore() {
  return createStore<ApplicationState>({
    reducers: {
      [counterFeatureKey]: reducer,
    }
  });
}
