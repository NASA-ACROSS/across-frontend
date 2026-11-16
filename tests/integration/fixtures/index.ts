import { mergeTests } from '@playwright/test';
import { test as mockserver } from './mockserver.fixture';
import { test as fake } from './mocks/fake.fixture';
import { test as login } from './login.fixture';

export const test = mergeTests(mockserver, fake, login);
