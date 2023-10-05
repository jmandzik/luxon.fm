<script lang="ts">
	import { onMount } from 'svelte';

	let ready = false;
	let subscriptions: string[] = [];

	onMount(async () => {
		const root = await navigator.storage.getDirectory();
		const podcasts_directory = await root.getDirectoryHandle('podcasts', { create: true });
		for await (let [name, handle] of podcasts_directory) {
			console.log({ name, handle });
		}

		ready = true;
	});
</script>

<div class="container">
	{#if ready && subscriptions.length > 0}
		<h1>Podcasts</h1>
		<ul>
			{#each subscriptions as subscription}
				<li>{subscription}</li>
			{/each}
		</ul>
	{:else}
		<h1>Add your favorite podcasts</h1>
		<p>
			Tap Subscribe on podcasts to add them Headers. You'll see the latest episodes for all your
			favorite podcasts in one place.
		</p>

		<a href="/explore" class="neon neon-blue flicker" style:--tag="Explore">Explore</a>
	{/if}
</div>

<style>
	.container {
		overflow: auto;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 1rem;
		gap: 1rem;
	}

	h1 {
		font-size: 1.5rem;
	}
	p {
		text-align: center;
		text-wrap: balance;
	}
</style>
