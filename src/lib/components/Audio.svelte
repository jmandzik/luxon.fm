<script lang="ts">
	import { audio_store } from '$lib/stores';
	import { onMount } from 'svelte';

	let audio_el: HTMLAudioElement;

	onMount(() => {
		audio_store.set_audio_element(audio_el);
	});
	const toggle_play_pause = async () => {
		if ($audio_store.is_playing) {
			audio_store.play();
		} else {
			audio_store.pause();
		}
	};
</script>

<audio bind:this={audio_el}></audio>
{#if $audio_store.episode}
	<div class="audio-wrapper">
		<div
			class="album-art"
			role="img"
			aria-label="Album Art"
			style="background-image: url({$audio_store.episode.feedImage})"
		></div>
		<div class="track-title">{$audio_store.episode.title}</div>
		<button on:click={toggle_play_pause}>
			<span class="material-symbols-outlined">
				{$audio_store.is_playing ? 'pause' : 'play_arrow'}
			</span>
		</button>
	</div>
{/if}

<style>
	.audio-wrapper {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #020617;
		color: #e2e8f0;
		height: 48px;
		padding: 8px 0;
		width: 100%;
	}

	.track-title {
		flex-grow: 1;
		text-align: center;
	}

	.album-art {
		height: 32px;
		width: 32px;
		background-size: cover;
		cursor: pointer;
	}
</style>
