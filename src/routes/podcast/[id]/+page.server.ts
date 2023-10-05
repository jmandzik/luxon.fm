import { error } from '@sveltejs/kit';
import { client } from '$lib/utils';

export async function load({ params }) {
	return {
		podcast: client.podcastById(Number(params.id)).then((p) => p.feed)
	};
}
