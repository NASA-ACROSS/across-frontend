import type dataBuilder from './dataBuilder';
import type { Telescope, Observation, Schedule } from '#lib/types/across/index.ts';
import type { User } from '#lib/types/User/User.ts';

import { test as base } from '@playwright/test';
import { default as fakeTelescope } from './telescope.fake';
import { default as fakeObservation } from './observation.fake';
import { default as fakeSchedule } from './schedules.fake';
import { default as fakeUser } from './user.fake';

/** Single source of truth for which resource key produces which data shape. */
export interface ResourceDataMap {
    telescope: Telescope;
    observation: Observation;
    schedule: Schedule;
    user: User;
}

export type Resource = keyof ResourceDataMap;

type FakeData<T> = ReturnType<typeof dataBuilder<T>>;

type Fake = {
    [K in Resource]: FakeData<ResourceDataMap[K]>;
};

type Fixtures = {
    fake: Fake & {
        tokens: {
            access: string;
            refresh: string;
        };
    };
};

/**
 * Access token is a fake JWT with a fake payload since it needs to be decoded to extract a user ID.
 *
 * 100 years expiry. Hello from the past, future ACROSS engineers...or...bots, if you still exist.
 *
 * ```
 * {
 *  "sub": "user-1",
 *  "first_name": "Sandy",
 *  "last_name": "Cheeks",
 *  "username": "sandycheeks",
 *  "email": "sandy@treedome.space",
 *  "exp": 4922928000,
 *  "iat": 1516239022
 * }
 * ```
 */

const FAKE_ACCESS_TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyLTEiLCJmaXJzdF9uYW1lIjoiU2FuZHkiLCJsYXN0X25hbWUiOiJDaGVla3MiLCJ1c2VybmFtZSI6InNhbmR5Y2hlZWtzIiwiZW1haWwiOiJzYW5keUB0cmVlZG9tZS5zcGFjZSIsImV4cCI6NDkyMjkyODAwMCwiaWF0IjoxNTE2MjM5MDIyfQ.kI1jKDYjTRr6QhEeOftktVs1EQWiJu2BnBpXIi8GIpw';

/** The refresh token does not need to be decoded so it is a simple string */
const FAKE_REFRESH_TOKEN = 'fake-refresh-token';

const test = base.extend<Fixtures>({
    fake: async ({}, use) => {
        await use({
            telescope: fakeTelescope,
            observation: fakeObservation,
            schedule: fakeSchedule,
            user: fakeUser,
            tokens: {
                access: FAKE_ACCESS_TOKEN,
                refresh: FAKE_REFRESH_TOKEN,
            },
        });
    },
});

export { test };
