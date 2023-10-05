<script lang="ts">
	export let data;
</script>

<div class="container">
	<section>
		<form id="search_form">
			<input type="search" name="term" placeholder="Search podcasts..." />
		</form>
		<ul>
			{#each data.search_results as podcast}
				<li>
					<a href={`/podcast/${podcast.id}`}>
						<img
							src={podcast.image}
							alt={podcast.author}
							loading="lazy"
							style:--tag={`p-${podcast.id}`}
						/>
						<p>{podcast.title}</p>
					</a>
				</li>
			{/each}
		</ul>
	</section>
	<section>
		<h2>Explore</h2>
		<ul>
			{#each [] as podcast}
				<li>
					<a href={`/podcast/${podcast.id}`}>
						<img
							src={podcast.image}
							alt={podcast.author}
							loading="lazy"
							style:--tag={`p-${podcast.id}`}
						/>
						<p>{podcast.title}</p>
					</a>
				</li>
			{/each}
		</ul>
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
	section {
		width: 100%;
	}
	img {
		width: 48px;
		height: 48px;
	}

	ul {
		display: grid;
		gap: 1rem;
	}

	a {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	form {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
	}

	input {
		background-color: #333;
		border: none;
		border-radius: 0.25rem;
		color: #fff;
		padding: 0.25rem 0.5rem;
		width: 100%;
		outline: none;
		box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);
	}

	::placeholder {
		color: #888;
	}
</style>
