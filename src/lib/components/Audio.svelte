<script lang="ts">
	import { audio_store } from '$lib/stores';
	import { onMount } from 'svelte';

	let audio_el: HTMLAudioElement;
	let progress_bar_el: HTMLDivElement;
	let is_dragging = false;

	$: progress = $audio_store.episode
		? $audio_store.current_time / $audio_store.episode.duration
		: 0;

	onMount(() => {
		audio_store.set_audio_element(audio_el);
		progress_bar_el.addEventListener('mousemove', handle_move);
		progress_bar_el.addEventListener('touchmove', handle_move);

		return () => {
			progress_bar_el.removeEventListener('mousemove', handle_move);
			progress_bar_el.removeEventListener('touchmove', handle_move);
		};
	});

	const toggle_play_pause = async () => {
		if ($audio_store.is_playing) {
			audio_store.pause();
		} else {
			audio_store.play();
		}
	};

	const handle_move = (event: MouseEvent | TouchEvent) => {
		if (!is_dragging) return;

		const rect = progress_bar_el.getBoundingClientRect();
		const x = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
		const progress = (x - rect.left) / rect.width;
		$audio_store.audio_element.currentTime = progress * audio_store.episode.duration;
	};
</script>

<audio bind:this={audio_el}></audio>
<div class="audio-wrapper" class:hidden={!$audio_store.episode}>
	<div class="progress_bar" style="--progress: {progress};" bind:this={progress_bar_el}></div>
	<div
		class="progress_circle"
		style="--progress: {progress};"
		on:mousedown={() => (is_dragging = true)}
		on:mouseup={() => (is_dragging = false)}
		on:mouseleave={() => (is_dragging = false)}
		on:touchstart={() => (is_dragging = true)}
		on:touchend={() => (is_dragging = false)}
		role="slider"
		tabindex="0"
		aria-valuenow={$audio_store.current_time}
	></div>
	{#if $audio_store.episode}
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
	{/if}
</div>

<style>
	.audio-wrapper {
		display: flex;
		position: relative;
		align-items: center;
		justify-content: space-between;
		background-color: #020617;
		color: #e2e8f0;
		height: 48px;
		padding: 1rem;
		width: 100%;
	}

	.progress_bar {
		position: absolute;
		top: 0;
		left: 0;
		height: 2px;
		background: #00ffff;
		box-shadow:
			0 0 5px #00ffff,
			0 0 10px #00ffff;
		width: calc(100% * var(--progress));
		transition: width 0.3s;
	}

	.progress_circle {
		position: absolute;
		top: -5px;
		left: calc((100% - 10px) * var(--progress));
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: #00ffff;
		box-shadow:
			0 0 5px #00ffff,
			0 0 10px #00ffff;
		transition: left 0.3s;
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
