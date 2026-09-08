import { mergeTests } from '@playwright/test';
import { test as mockserver } from './mockserver.fixture';
import { test as fake } from './mocks/fake.fixture';

export const test = mergeTests(mockserver, fake);
