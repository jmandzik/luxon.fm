<script lang="ts">
	import { localized_date } from '$lib/utils';
	import { onMount } from 'svelte';
	import { save_podcast } from '$lib/crud';
	export let data;

	let opfs_root: FileSystemDirectoryHandle;

	onMount(async () => {
		opfs_root = await navigator.storage.getDirectory();
	});
	const on_subscribe = async () => {
		// fetch the most recent episode via enclosureUrl
		const response = await fetch(data.episodes[0].enclosureUrl);
		if (!response.ok) {
			console.error(`Failed to fetch ${data.episodes[0].enclosureUrl}`);
		}
		const buffer = await response.arrayBuffer();

		await save_podcast(opfs_root, data.podcast.id, data.episodes[0].id, buffer);
	};
</script>

<div class="container">
	<a href="/explore">
		<span class="material-symbols-outlined"> arrow_back </span>
	</a>
	<header>
		<img
			src={data.podcast.image}
			alt={data.podcast.title}
			style:--tag={`podcast-image-${data.podcast.id}`}
		/>
		<div>
			<h1 style:--tag={`podcast-title-${data.podcast.id}`}>{data.podcast.title}</h1>
			<p>{data.podcast.author}</p>
		</div>
	</header>
	<section>
		<div>
			<button class="neon neon-blue" on:click={on_subscribe}>
				<span class="material-symbols-outlined"> add </span>
				<span>Subscribe</span>
			</button>
		</div>
		<p class="description">{@html data.podcast.description}</p>
	</section>
	<section>
		<p>{data.podcast.episodeCount} episodes</p>
		{#each data.episodes as episode}
			<a href={`/podcast/${data.podcast.id}/${episode.id}`}>
				<div class="episode">
					<time datetime={new Date(episode.datePublished * 1000).toISOString()}>
						{localized_date(episode.datePublished)}
					</time>
					<div class="episode-info">
						<h2 style:--tag={`title-${episode.id}`}>{episode.title}</h2>
						<p class="description">{@html episode.description}</p>
					</div>
				</div>
			</a>
		{/each}
	</section>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		overflow: auto;
		width: 100%;
		height: 100%;
	}

	a {
		align-self: flex-start;
	}

	header {
		display: flex;
		gap: 1rem;

		& p {
			font-size: 0.8rem;
		}
	}

	time {
		font-size: 0.8rem;
	}

	.description {
		font-size: 0.8rem;
	}
	h1 {
		font-size: 1.25rem;
		font-weight: 500;
		text-wrap: balance;
	}

	h2 {
		font-size: 1rem;
		font-weight: 500;
		text-wrap: balance;
	}

	section {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	img {
		width: 100px;
		height: 100px;
		object-fit: cover;
	}

	.episode-info {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	button {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		font-size: 0.8rem;
		padding: 0.25rem 0.5rem;
		border-radius: 0.5rem;
		border: 1px solid var(--neon);
	}
</style>
