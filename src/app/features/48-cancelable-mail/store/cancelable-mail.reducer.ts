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

  // TODO: event storming + events impl

);

export interface AppState {
  [cancelableMailFeatureKey]: SliceState; // IMPORTANT: prop name must equal featureName
}
