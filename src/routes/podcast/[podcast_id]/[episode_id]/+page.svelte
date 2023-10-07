<script lang="ts">
	import { audio_store } from '$lib/stores';
	import { localized_date } from '$lib/utils';

	export let data;

	const on_play_pause = () => {
		if (!$audio_store.episode) {
			audio_store.set_episode(data.episode);
		}
		if (!$audio_store.is_playing) {
			audio_store.play();
		} else {
			audio_store.pause();
		}
	};
</script>

<div class="container">
	<a href="./">
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
		<time datetime={new Date(data.episode.datePublished * 1000).toISOString()}>
			{localized_date(data.episode.datePublished)}
		</time>
		<h2 style:--tag={`title-${data.episode.id}`}>
			{data.episode.title}
		</h2>
	</section>
	<section>
		<button class="neon neon-blue" on:click={on_play_pause}>
			{#if $audio_store.is_playing}
				<span class="material-symbols-outlined"> pause </span>
				<span>Pause</span>
			{:else}
				<span class="material-symbols-outlined"> play_arrow </span>
				<span>Play</span>
			{/if}
		</button>
	</section>
	<p>{@html data.episode.description}</p>
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

	section {
		width: 100%;
	}
	header {
		display: flex;
		align-items: center;
		gap: 1rem;

		& p {
			font-size: 0.8rem;
		}
	}

	time {
		font-size: 0.8rem;
	}

	h1 {
		text-wrap: balance;
		font-weight: 500;
	}

	h2 {
		font-size: 1.25rem;
	}

	img {
		width: 48px;
		height: 48px;
		object-fit: cover;
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
