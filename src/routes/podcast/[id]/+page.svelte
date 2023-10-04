<script lang="ts">
	export let data;

	console.log(data);
</script>

<img src={data.podcast.image} alt={data.podcast.title} style:--tag={`p-${data.podcast.id}`} />
