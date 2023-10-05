import { client } from '$lib/api';

export async function load({ params }) {
	return {
		episode: client
			.episodeById(Number(params.episode_id), {
				fulltext: true
			})
			.then((p) => p.episode)
	};
}
