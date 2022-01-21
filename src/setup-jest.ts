import 'jest-preset-angular/setup-jest';
import '@testing-library/jest-dom';
import 'core-js';
// import 'core-js/es/reflect';
// import 'core-js/proposals/reflect-metadata';

import './test/jestGlobalMocks';
import './test/setup-mock-server';
import './test/setup-mock-timers';

import { setupTimeZone } from './test/setup-timezone';

setupTimeZone();

// @ts-ignore
jest.setTimeout(6000);
