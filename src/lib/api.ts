import PodcastIndexClient from 'podcastdx-client';
import { env } from '$env/dynamic/private';

export const client = new PodcastIndexClient({
	key: env.PODCASTINDEX_KEY,
	secret: env.PODCASTINDEX_SECRET,
	disableAnalytics: true
});
