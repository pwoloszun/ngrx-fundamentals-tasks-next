import { createSelector } from '@ngrx/store';

import { AppState, cancelableMailFeatureKey } from './cancelable-mail.reducer';

const selectStateSlice = (state: AppState) => state[cancelableMailFeatureKey];

export const selectEmailSendStage = createSelector(
  [selectStateSlice],
  (stateSlice) => stateSlice.mailSendStage
);
