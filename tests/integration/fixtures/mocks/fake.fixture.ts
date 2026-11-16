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
    fake: Fake;
};

const test = base.extend<Fixtures>({
    fake: async ({}, use) => {
        await use({
            telescope: fakeTelescope,
            observation: fakeObservation,
            schedule: fakeSchedule,
            user: fakeUser,
        });
    },
});

export { test };
