import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import * as dayjs from 'dayjs';

import { spy } from 'sinon';

import { CounterComponent } from './counter.component';

function dateToTimestamp(dateStr: string): number {
  return dayjs(dateStr, 'YYYY-MM-DD HH:mm:ss').valueOf();
}

function createOutputSpy(): any {
  const emitSpy = spy();
  const output = {
    emit: emitSpy,
  } as any;
  return [output, emitSpy];
}

describe('CounterComponent', () => {
  it('should render passed props', async () => {
    await render(CounterComponent, {
      componentProperties: {
        value: 47,
        updatedAt: dateToTimestamp('2009-03-09 13:21:45'),
      },
    });

    expect(screen.getByText(/Value: 47/i));
    expect(screen.getByText(/Updated: 13:21:45/i));
  });

  it('should handle passed events', async () => {
    const [incrementEvEmitter, incSpy] = createOutputSpy();
    const [decrementEvEmitter, decSpy] = createOutputSpy();
    const [resetEvEmitter, resetSpy] = createOutputSpy();

    await render(CounterComponent, {
      componentProperties: {
        increment: incrementEvEmitter,
        decrement: decrementEvEmitter,
        reset: resetEvEmitter,
      },
    });

    const incrementBtn = screen.getByText('Increment');
    userEvent.click(incrementBtn);
    expect(incSpy.called).toEqual(true);

    const decrementBtn = screen.getByText('Decrement');
    userEvent.click(decrementBtn);
    expect(decSpy.called).toEqual(true);

    const resetBtn = screen.getByText('Reset');
    userEvent.click(resetBtn);
    expect(resetSpy.called).toEqual(true);
  });
});
