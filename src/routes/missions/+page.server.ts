import {
    missionsCardData,
    type MissionsCardDataType,
} from '$lib/content/missionsCardData';

export function load() {
    return { missionCards: missionsCardData };
}
