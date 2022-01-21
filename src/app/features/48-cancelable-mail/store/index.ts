import * as actions from './cancelable-mail.actions';
import * as selectors from './cancelable-mail.selectors';
import { CancelableMailEffects } from './cancelable-mail.effects';

import {
  cancelableMailFeatureKey,
  SliceState,
  AppState,
  reducer
} from './cancelable-mail.reducer';

export {
  actions,
  selectors,
  SliceState,
  AppState,
  reducer,
  cancelableMailFeatureKey,
  CancelableMailEffects,
};
