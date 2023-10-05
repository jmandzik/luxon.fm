<script lang="ts">
	import { localized_date } from '$lib/utils';

	export let data;
	console.log(data);
</script>

<div class="container">
	<header>
		<a href="./">
			<img
				src={data.episode.feedImage}
				alt={data.episode.title}
				style:--tag={`p-${data.episode.feedId}`}
			/>
		</a>
		<div>
			<h1 style:--tag={`title-${data.episode.id}`}>{data.episode.title}</h1>
			<time datetime={new Date(data.episode.datePublished * 1000).toISOString()}>
				{localized_date(data.episode.datePublished)}
			</time>
		</div>
	</header>
	<audio controls>
		<source src={data.episode.enclosureUrl} type="audio/mpeg" />
	</audio>
	<p>{@html data.episode.description}</p>
</div>

<style>
	header {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	h1 {
		text-wrap: balance;
	}

	img {
		width: 150px;
		height: 150px;

		object-fit: cover;
	}
</style>
