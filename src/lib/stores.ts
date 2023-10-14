import { writable, type Writable } from 'svelte/store';
import { load_podcast, save_podcast } from './crud';
import type { PIApiEpisodeDetail } from 'podcastdx-client/dist/src/types';

interface AudioState {
	episode: any;
	current_time: number;
	is_playing: boolean;
	audio_element: HTMLAudioElement | null;
}

interface AudioStore extends Writable<AudioState> {
	set_audio_element: (new_audio_element: HTMLAudioElement) => void;
	set_episode: (episode: any) => void;
	play: () => Promise<void>;
	pause: () => void;
}

function create_audio_store(): AudioStore {
	let audio_element: HTMLAudioElement | null = null;
	let episode: PIApiEpisodeDetail | null = null;
	let current_time: number = 0;

	const { subscribe, set, update } = writable<AudioState>({
		episode: null,
		current_time: 0,
		is_playing: false,
		audio_element
	});

	function attach_time_update_listener(): void {
		if (audio_element) {
			audio_element.addEventListener('timeupdate', () => {
				current_time = audio_element!.currentTime;
				update((state) => ({ ...state, current_time: audio_element!.currentTime }));
			});
		}
	}

	return {
		subscribe,
		set: (value: AudioState) => set(value),
		update: (updater: (value: AudioState) => AudioState) => update(updater),

		set_audio_element: (new_audio_element: HTMLAudioElement) => {
			audio_element = new_audio_element;
			attach_time_update_listener();
		},
		set_episode: (ep: PIApiEpisodeDetail) => {
			update((state) => ({ ...state, episode: ep }));
			episode = ep;
			if (audio_element) {
				audio_element.src = episode.enclosureUrl;
			}
		},
		play: async () => {
			if (!audio_element || !episode) return;

			// Reference to OPFS root (adjust as needed)
			const opfs_root = await navigator.storage.getDirectory();

			// Check if the episode already exists in OPFS
			const object_url = await load_podcast(opfs_root, episode.feedId, episode.id).catch(
				async () => {
					if (!episode) return;
					// Fall back to fetching from the enclosure URL and save to OPFS for future use
					const response = await fetch(episode.enclosureUrl);
					const episode_array_buffer = await response.arrayBuffer();
					await save_podcast(opfs_root, episode.feedId, episode.id, episode_array_buffer);
					return URL.createObjectURL(new Blob([episode_array_buffer], { type: 'audio/mpeg' }));
				}
			);

			audio_element.src = object_url!;
			audio_element.currentTime = current_time;
			await audio_element.play();
			update((state) => ({ ...state, is_playing: true }));
		},
		pause: () => {
			if (audio_element) {
				audio_element.pause();
				update((state) => ({ ...state, is_playing: false }));
			}
		}
	};
}

export const audio_store = create_audio_store();
