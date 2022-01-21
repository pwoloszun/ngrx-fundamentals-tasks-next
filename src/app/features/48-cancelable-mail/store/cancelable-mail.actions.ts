import { createAction, props } from '@ngrx/store';

import { MailEntityParams } from '../models/mail-entity';

export const mailDialogOpened = createAction(
  '[Create Mail Page] Modal Dialog Opened'
);

export const mailDialogClosed = createAction(
  '[Mail Dialog] Modal Dialog Closed'
);

export const sendMailStarted = createAction(
  '[Mail Dialog] Send Mail Started',
  props<MailEntityParams>()
);

export const cancelSendMailStarted = createAction(
  '[Sending Snackbar] Cancel Send Mail Started',
);

export const cancelSendMailEnded = createAction(
  '[API] Cancel Send Mail Ended',
);

export const timeToCancelExpired = createAction(
  '[API] Time To Cancel Expired',
);

export const revertSendMailStarted = createAction(
  '[Sending Snackbar] Revert Send Mail Started',
);

export const revertSendMailEnded = createAction(
  '[API] Revert Send Mail Ended',
);

export const timeToRevertExpired = createAction(
  '[API] Time To Revert Expired',
);

export const sendMailSuccessfullyEnded = createAction(
  '[API] Send Mail Successfully Ended',
);
