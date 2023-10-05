import PodcastIndexClient from 'podcastdx-client';
import { env } from '$env/dynamic/private';
import crypto from 'crypto';

export const client = new PodcastIndexClient({
	key: env.PODCASTINDEX_KEY,
	secret: env.PODCASTINDEX_SECRET,
	disableAnalytics: true
});

export const safe_string = (url: string) => {
	return url.replace(/[^a-zA-Z0-9]/g, '_');
};
