import { Action, createReducer, on } from '@ngrx/store';
import produce from 'immer';

import * as actions from './cancelable-mail.actions';
import { MailEntityParams } from '../models/mail-entity';

export const cancelableMailFeatureKey = 'cancelableMail';

export enum MailSendStage {
  Idle = 'IDLE',

  SendingCancellable = 'SENDING_CANCELLABLE',
  SendingCancelled = 'SENDING_CANCELLED',

  SendingReversible = 'SENDING_REVERSIBLE',
  SendingReverted = 'SENDING_REVERTED',

  Sent = 'SENT',
}

export interface SliceState {
  mailSendStage: MailSendStage;
  toSend: MailEntityParams | null;
  isMailOpened: boolean;
}

export const initialState: SliceState = {
  mailSendStage: MailSendStage.Idle,
  toSend: null,
  isMailOpened: false,
};

export const reducer = createReducer(
  initialState,

  on(actions.mailDialogOpened, (state) => {
    return produce(state, (draft) => {
      draft.isMailOpened = true;
    });
  }),

  on(actions.mailDialogClosed, (state) => {
    return produce(state, (draft) => {
      draft.isMailOpened = false;
    });
  }),

  on(actions.sendMailStarted, (state, mailParams) => {
    return produce(state, (draft) => {
      draft.mailSendStage = MailSendStage.SendingCancellable;
      draft.toSend = mailParams;
      draft.isMailOpened = false;
    });
  }),

  on(actions.cancelSendMailStarted, (state) => {
    return produce(state, (draft) => {
      draft.mailSendStage = MailSendStage.SendingCancelled;
      draft.toSend = null;
      draft.isMailOpened = true;
    });
  }),

  on(actions.cancelSendMailEnded, (state) => {
    return produce(state, (draft) => {
      draft.mailSendStage = MailSendStage.Idle;
    });
  }),

  on(actions.timeToCancelExpired, (state) => {
    return produce(state, (draft) => {
      draft.mailSendStage = MailSendStage.SendingReversible;
    });
  }),

  on(actions.revertSendMailStarted, (state) => {
    return produce(state, (draft) => {
      draft.mailSendStage = MailSendStage.SendingReverted;
      draft.toSend = null;
      draft.isMailOpened = true;
    });
  }),

  on(actions.revertSendMailEnded, (state) => {
    return produce(state, (draft) => {
      draft.mailSendStage = MailSendStage.Idle;
    });
  }),

  on(actions.timeToRevertExpired, (state) => {
    return produce(state, (draft) => {
      draft.mailSendStage = MailSendStage.Sent;
    });
  }),


  on(actions.sendMailSuccessfullyEnded, (state) => {
    return produce(state, (draft) => {
      draft.mailSendStage = MailSendStage.Idle;
      draft.toSend = null;
    });
  }),

);

export interface AppState {
  [cancelableMailFeatureKey]: SliceState; // IMPORTANT: prop name must equal featureName
}
