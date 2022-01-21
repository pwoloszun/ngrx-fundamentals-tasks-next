import { isJestRunning } from 'src/test/utils/is-jest-running';

export function getDelay(): number {
  return isJestRunning() ? 0 : 1600;
}
