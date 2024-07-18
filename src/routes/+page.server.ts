import { newsData, type NewsDataType } from '$lib/content/newsData';
import type { FrontpageStatisticsDTO } from '$lib/types/FrontpageStatisticsDTO';
import { CONFIG } from '../config/config';

const NUM_POSTS_DISPLAY = 6;

const USAGE_STATS_CACHE = {
    lastFetchedMilliseconds: 0,
    stats: {
        apiCount: 404,
        tooCount: 313,
        coordinatedObservationsCount: 0,
    },
};
const FIFTEEN_MINUTES_AS_MILISECONDS = 900000;

/** @type {import('./$types').PageLoad} */
export async function load() {
    let responseJson: FrontpageStatisticsDTO;

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${CONFIG.API_TOKEN}`,
        },
    };

    const nowMilliseconds = Date.now();
    const dateDiff =
        nowMilliseconds - USAGE_STATS_CACHE.lastFetchedMilliseconds;

    if (dateDiff > FIFTEEN_MINUTES_AS_MILISECONDS) {
        try {
            const res = await fetch(
                `${CONFIG.API_URL}/api/v1/frontend/statistics_counts`,
                options
            );
            if (res.status === 403) {
                throw new Error('Not Authorized');
            }
            responseJson = await res.json();
            USAGE_STATS_CACHE.stats = responseJson;
            USAGE_STATS_CACHE.lastFetchedMilliseconds = nowMilliseconds;
        } catch (e) {
            console.error('Error fetching data from API', e);
            responseJson = {
                apiCount: 404,
                tooCount: 313,
                coordinatedObservationsCount: 0,
            };
        }
    }

    return {
        ...USAGE_STATS_CACHE.stats,
        newsPosts: newsData.slice(0, NUM_POSTS_DISPLAY) as NewsDataType[],
    };
}
