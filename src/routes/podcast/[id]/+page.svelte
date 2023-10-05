<script lang="ts">
	export let data;
</script>

<div class="container">
	<img src={data.podcast.image} alt={data.podcast.title} style:--tag={`p-${data.podcast.id}`} />
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
</style>
