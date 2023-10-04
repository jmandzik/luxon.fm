import { env } from '$env/dynamic/private';

export async function load({ url }) {
	const term = url.searchParams.get('term');

	const base_url = `https://listen-api.listennotes.com/api/v2`;
	const options = {
		headers: {
			'X-ListenAPI-Key': env.LISTEN_NOTES_API_KEY
		}
	};

	let recommendations = [];
	const recommendations_response = await fetch(`${base_url}/best_podcasts?genre_id=127`, options);
	if (!recommendations_response.ok) {
		console.log(recommendations_response);
		recommendations = [];
	} else {
		const recommendations_json = await recommendations_response.json();
		recommendations = recommendations_json.podcasts;
	}

	return {
		recommendations,
		search_results: term
			? fetch(`${base_url}/search?q=${term}`, options)
					.then((r) => r.json())
					.then((r) => r.results)
					.catch(console.log)
			: []
	};
}
