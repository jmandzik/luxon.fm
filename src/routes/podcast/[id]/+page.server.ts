import { env } from '$env/dynamic/private';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const base_url = `https://listen-api.listennotes.com/api/v2`;
	const options = {
		headers: {
			'X-ListenAPI-Key': env.LISTEN_NOTES_API_KEY
		}
	};

	const response = await fetch(`${base_url}/podcasts/${params.id}`, options);
	if (!response.ok) {
		throw error(response.status, response.statusText);
	}
	const podcast = await response.json();

	return { podcast };
}
