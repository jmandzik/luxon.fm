import type { PIApiEpisodeDetail } from 'podcastdx-client/dist/src/types';
import { writable } from 'svelte/store';

type Player =
	| {
			episode: PIApiEpisodeDetail;
			state: 'playing' | 'paused';
			current_time: number;
			audio: HTMLAudioElement;
			play: () => void;
			pause: () => void;
			stop: () => void;
	  }
	| {
			episode: null;
			audio: HTMLAudioElement;
	  };
export const player_store = writable<Player>({
	episode: null,
	audio: undefined as unknown as HTMLAudioElement
});
