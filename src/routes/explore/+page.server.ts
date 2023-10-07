import { client } from '$lib/api';

export async function load({ url }) {
	const term = url.searchParams.get('term');
	const suggestions = [
		{
			id: 403674,
			podcastGuid: 'f2736050-754f-5dd0-be29-1d6278331176',
			medium: 'podcast',
			title: 'JS Party: JavaScript, CSS, Web Development',
			url: 'https://changelog.com/jsparty/feed',
			originalUrl: 'https://changelog.com/jsparty/feed',
			link: 'https://changelog.com/jsparty',
			description:
				'Your weekly celebration of JavaScript and the web.  Panelists include Jerod Santo, Feross Aboukhadijeh, Kevin Ball, Amelia Wattenberger, Nick Nisi, Divya Sasidharan, Mikeal Rogers,  Chris Hiller, and Amal Hussein. Topics discussed include the web platform (Chrome, Safari, Edge, Firefox, Brave, etc), front-end frameworks (React, Solid, Svelte, Vue, Angular, etc), JavaScript and TypeScript runtimes (Node, Deno, Bun), web animation, SVG, robotics, IoT, and much more. If JavaScript and/or the web touch your life, this show’s for you. Some people search for JSParty and can’t find the show, so now the string JSParty is in our description too.',
			author: 'Changelog Media',
			ownerName: 'Changelog Media',
			image: 'https://cdn.changelog.com/uploads/covers/js-party-original.png?v=63725770332',
			artwork: 'https://cdn.changelog.com/uploads/covers/js-party-original.png?v=63725770332',
			lastUpdateTime: 1696550981,
			lastCrawlTime: 1696638455,
			lastParseTime: 1696550986,
			lastGoodHttpStatusTime: 1696550969,
			lastHttpStatus: 200,
			contentType: 'application/xml; charset=utf-8',
			itunesId: 1209616598,
			itunesType: 'episodic',
			generator: '',
			language: 'en-us',
			explicit: false,
			type: 0,
			dead: 0,
			chash: '7a640d01d5112fddac85b766fb42982b',
			episodeCount: 305,
			crawlErrors: 0,
			parseErrors: 0,
			categories: { '102': 'Technology' },
			locked: 0,
			imageUrlHash: 1254708016,
			funding: {
				url: 'https://changelog.com/++',
				message: 'Support our work by joining Changelog++'
			}
		}
	];
	if (!term) {
		return {
			search_results: [],
			suggestions
		};
	}

	const { feeds } = await client.search(term);

	return {
		search_results: feeds,
		suggestions
	};
}
