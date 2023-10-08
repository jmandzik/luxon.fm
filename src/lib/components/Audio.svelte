<script lang="ts">
	import { audio_store } from '$lib/stores';
	import { throttle } from '$lib/utils';
	import { onMount } from 'svelte';

	let audio_el: HTMLAudioElement;

	$: progress = $audio_store.episode
		? Math.round($audio_store.current_time || 0 / $audio_store.episode.duration)
		: 0;

	$: track_fill = `${($audio_store.current_time / ($audio_store.episode?.duration || 1)) * 100}%`;
	$: console.log({ progress });
	$: console.log({ current_time: $audio_store.current_time });
	$: console.log({
		track_fill
	});

	onMount(() => {
		audio_store.set_audio_element(audio_el);
	});

	const toggle_play_pause = async () => {
		if ($audio_store.is_playing) {
			audio_store.pause();
		} else {
			audio_store.play();
		}
	};

	async function seek_audio(event) {
		audio_el.currentTime = event.target.value;
	}
</script>

<audio bind:this={audio_el}></audio>
<div class="audio-wrapper" class:hidden={!$audio_store.episode}>
	<input
		type="range"
		min="0"
		max={$audio_store.episode?.duration}
		bind:value={$audio_store.current_time}
		on:input={seek_audio}
		style:--track-fill={track_fill}
	/>

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

	input[type='range'] {
		--track-height: 0.5ex;
		--track-fill: 0%;
		--thumb-size: 3ex;
		--thumb-offset: -1.25ex;
		--thumb-highlight-size: 0px;
		--thumb-highlight-color: hsl(0 0% 100% / 20%);
		--surface-3: hsl(0 0% 100% / 20%);
		--brand-bg-gradient: linear-gradient(to right, hsl(194 100% 40%), hsl(47.9, 95.8%, 53.1%));

		accent-color: #00ffff;
		caret-color: #00ffff;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		display: block;
		inline-size: 100%;
		margin: 0;
		appearance: none;
		-webkit-appearance: none;
		background: transparent;
		outline-offset: 5px;

		@media (hover: none) {
			& {
				--thumb-size: 30px;
				--thumb-offset: -14px;
			}
		}

		&::-webkit-slider-runnable-track {
			appearance: none;
			block-size: var(--track-height);
			border-radius: 5ex;
			background: linear-gradient(
					to right,
					hsl(194, 100%, 63%) var(--track-fill),
					var(--surface-3) 0%
				),
				fixed;
		}

		&::-moz-range-track {
			appearance: none;
			block-size: var(--track-height);
			border-radius: 5ex;
			background:
				linear-gradient(to right, transparent var(--track-fill), var(--surface-3) 0%),
				var(--brand-bg-gradient) fixed;
		}

		&::-webkit-slider-thumb {
			appearance: none;
			-webkit-appearance: none;
			cursor: ew-resize;
			border: 3px solid var(--surface-1);
			block-size: var(--thumb-size);
			inline-size: var(--thumb-size);
			margin-block-start: var(--thumb-offset);
			border-radius: 50%;
			background: hsl(194, 100%, 63%) fixed;
			box-shadow: 0 0 0 var(--thumb-highlight-size) var(--thumb-highlight-color);
			transition: box-shadow 0.1s ease;
		}

		&::-moz-range-thumb {
			appearance: none;
			cursor: ew-resize;
			border: 3px solid var(--surface3);
			block-size: var(--thumb-size);
			inline-size: var(--thumb-size);
			margin-block-start: var(--thumb-offset);
			border-radius: 50%;
			background: var(--brand-bg-gradient) fixed;
			box-shadow: 0 0 0 var(--thumb-highlight-size) var(--thumb-highlight-color);
			transition: box-shadow 0.1s ease;
		}

		&:is(:hover, :active) {
			--thumb-highlight-size: 10px;
		}
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
		cursor: grab;
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
