import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { createStore } from 'src/test/utils/create-store';
import { expectStateChanges } from 'src/test/utils/helpers';

import { SharedModule } from '@app/shared/shared.module';

import { MailStatus, MailEntityParams } from '../../models/mail-entity';
import { MailSendStage } from '../cancelable-mail.reducer';
import {
  reducer,
  actions,
  AppState,
  cancelableMailFeatureKey,
  selectors,
  CancelableMailEffects,
} from '../index';

describe('AsyncCounterRefactored slice', () => {

  it('should run send email flow if neither cancelled nor reverted', (done) => {
    const store = createSliceStore();
    const expectedStateSnaphots = [
      MailSendStage.Idle,
      MailSendStage.SendingCancellable,
      MailSendStage.SendingReversible,
      MailSendStage.Sent,
      MailSendStage.Idle,
    ];
    const mappingFn = (state: AppState) => selectors.selectEmailSendStage(state);

    expectStateChanges(
      store,
      expectedStateSnaphots,
      mappingFn,
      done
    );

    jest.useFakeTimers();

    store.dispatch(
      actions.sendMailStarted(generateEntity())
    );
    jest.advanceTimersByTime(12_000);

    jest.useRealTimers();
  });

  it('should run cancel send email flow if cancelled', (done) => {
    const store = createSliceStore();
    const expectedStateSnaphots = [
      MailSendStage.Idle,
      MailSendStage.SendingCancellable,
      MailSendStage.SendingCancelled,
      MailSendStage.Idle,
    ];
    const mappingFn = (state: AppState) => selectors.selectEmailSendStage(state);

    expectStateChanges(
      store,
      expectedStateSnaphots,
      mappingFn,
      done
    );

    jest.useFakeTimers();

    store.dispatch(
      actions.sendMailStarted(generateEntity())
    );
    jest.advanceTimersByTime(500);
    store.dispatch(
      actions.cancelSendMailStarted()
    );
    jest.advanceTimersByTime(10_000);

    jest.useRealTimers();
  });

});

function createSliceStore() {
  return createStore({
    reducers: {
      [cancelableMailFeatureKey]: reducer
    },
    effects: [CancelableMailEffects],
    imports: [SharedModule, NoopAnimationsModule]
  });
}

function generateEntity(): MailEntityParams {
  return {
    title: 'Meeting',
    to: ['qq@qq.qq'],
    from: 'ww@ww.ww',
    content: 'Lorem ipsum...',
    createdAt: 1234567,
    status: MailStatus.Sent
  };
}
