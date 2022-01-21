import { waitFor } from '@testing-library/angular';
import { map } from 'rxjs/operators';

type SelectorMappingFn = (state: any) => any;

export function expectStateChanges(
  store: any,
  expectedStateSnapshots: any[],
  selectorMappings: SelectorMappingFn,
  done: () => void
): void {
  let i = 0;
  store.pipe(
    map(selectorMappings)
  ).subscribe((actualState: any) => {
    if (i >= expectedStateSnapshots.length) {
      throw new Error(`Unexpected state change`);
    }
    expect(actualState).toEqual(expectedStateSnapshots[i]);
    if (i >= expectedStateSnapshots.length - 1) {
      done();
    }
    i += 1;
  });
}

interface WaitOptions {
  timeout?: number;
}

export async function waitForElToNotBeInDoc(el: HTMLElement, options?: WaitOptions) {
  return waitFor(() => {
    expect(el).not.toBeInTheDocument();
  }, options);
}
