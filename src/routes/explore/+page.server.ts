import { client } from '$lib/utils';

export async function load({ url }) {
	const term = url.searchParams.get('term');

	if (!term) {
		return {
			search_results: []
		};
	}

	const { feeds } = await client.search(term);

	return {
		search_results: feeds
	};
}
