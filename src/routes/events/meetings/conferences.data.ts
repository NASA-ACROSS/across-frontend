import type { Conference } from '$lib/types';
import * as luxon from 'luxon';

export default [
    {
        name: 'TDAMM Initiative Workshop',
        location: 'Annapolis, MD',
        dateRange: {
            begin: luxon.DateTime.fromISO('2022-08-22'),
            end: luxon.DateTime.fromISO('2022-08-24'),
        },
        abstractDeadline: luxon.DateTime.fromISO('2022-05-16'),
        registrationDeadline: luxon.DateTime.fromISO('2022-07-21'),
        url: 'https://pcos.gsfc.nasa.gov/TDAMM/',
    },
    {
        name: 'Windows on the Universe: Establishing the Infrastructure for a Collaborative Multi-messenger Ecosystem',
        location: 'Tuscon, AZ',
        dateRange: {
            begin: luxon.DateTime.fromISO('2023-10-16'),
            end: luxon.DateTime.fromISO('2023-10-18'),
        },
        abstractDeadline: luxon.DateTime.fromISO('2022-05-02'),
        registrationDeadline: luxon.DateTime.fromISO('2023-08-24'),
        url: 'https://noirlab.edu/science/events/websites/MMA2023',
    },
    {
        name: '3rd TDAMM Workshop: Multidisciplinary Science in the Multimessenger Era',
        location: 'Baton Rouge, LA',
        dateRange: {
            begin: luxon.DateTime.fromISO('2024-09-23'),
            end: luxon.DateTime.fromISO('2023-09-26'),
        },
        url: 'https://sites.google.com/view/3rd-tdamm-workshop/home',
    },
] satisfies Conference[];
