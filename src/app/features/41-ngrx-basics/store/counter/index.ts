import * as actions from './counter.actions';
import * as selectors from './counter.selectors';
import {
  counterFeatureKey,
  SliceState,
  reducer,
  ApplicationState,
} from './counter.reducer';

export {
  actions,
  selectors,
  SliceState as State,
  ApplicationState,
  reducer,
  counterFeatureKey,
};
