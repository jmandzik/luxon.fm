import { writable, type Writable } from 'svelte/store';

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

	const { subscribe, set, update } = writable<AudioState>({
		episode: null,
		current_time: 0,
		is_playing: false,
		audio_element
	});

	function attach_time_update_listener(): void {
		if (audio_element) {
			audio_element.addEventListener('timeupdate', () => {
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
		set_episode: (episode: any) => {
			update((state) => ({ ...state, episode }));
			console.log(audio_element);
			if (audio_element) {
				audio_element.src = episode.enclosureUrl;
			}
		},
		play: async () => {
			console.log(audio_element);
			if (audio_element) {
				await audio_element.play();
				update((state) => ({ ...state, is_playing: true }));
			}
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
