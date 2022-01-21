import { createAction, props } from '@ngrx/store';

import { MailEntityParams } from '../models/mail-entity';

export const mailDialogOpened = createAction(
  '[Create Mail Page] Modal Dialog Opened'
);

export const mailDialogClosed = createAction(
  '[Mail Dialog] Modal Dialog Closed'
);

// TODO: event storming
//    discover other app events (actions) + impl
