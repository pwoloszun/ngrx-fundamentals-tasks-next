import * as actions from './todos.actions';
import * as selectors from './todos.selectors';
import * as effects from './todos.effects';

import {
  todosFeatureKey,
  SliceState,
  reducer
} from './todos.reducer';

export {
  actions,
  selectors,
  effects,
  SliceState as State,
  reducer,
  todosFeatureKey,
};
