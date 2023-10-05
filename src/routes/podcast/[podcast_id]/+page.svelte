<script lang="ts">
	import { localized_date } from '$lib/utils';

	export let data;
</script>

<div class="container">
	<img src={data.podcast.image} alt={data.podcast.title} style:--tag={`p-${data.podcast.id}`} />
	<h1>{data.podcast.title}</h1>
	<p>{data.podcast.description}</p>
	{#each data.episodes as episode}
		<a href={`/podcast/${data.podcast.id}/${episode.id}`}>
			<div class="episode">
				<time datetime={new Date(episode.datePublished * 1000).toISOString()}>
					{localized_date(episode.datePublished)}
				</time>
				<div class="episode-info">
					<h2 style:--tag={`title-${episode.id}`}>{episode.title}</h2>
					<p>{@html episode.description}</p>
				</div>
			</div>
		</a>
	{/each}
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

	img {
		width: 300px;
		height: 300px;

		object-fit: cover;
	}
</style>
