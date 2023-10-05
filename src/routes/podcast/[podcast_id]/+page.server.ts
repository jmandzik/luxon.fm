import { client } from '$lib/api';

export async function load({ params }) {
	return {
		podcast: client.podcastById(Number(params.podcast_id)).then((p) => p.feed),
		episodes: client.episodesByFeedId(Number(params.podcast_id)).then((p) => p.items)
	};
}
