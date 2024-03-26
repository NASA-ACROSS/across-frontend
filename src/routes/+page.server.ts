import { newsData, type newsDataType } from '$lib/content/newsData'

const NUM_POSTS_DISPLAY = 6;

export function load() {
    return {
        newsPosts: newsData.slice(0, NUM_POSTS_DISPLAY)
    }
}