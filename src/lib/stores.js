import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Dark mode store
function createDarkModeStore() {
	const { subscribe, set, update } = writable(false);

	return {
		subscribe,
		toggle: () => update(n => !n),
		init: () => {
			if (browser) {
				const stored = localStorage.getItem('darkMode');
				if (stored) {
					set(JSON.parse(stored));
				} else {
					// Check system preference
					const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
					set(prefersDark);
				}
			}
		},
		set: (value) => {
			set(value);
			if (browser) {
				localStorage.setItem('darkMode', JSON.stringify(value));
			}
		}
	};
}

export const darkMode = createDarkModeStore();

// Language store
function createLanguageStore() {
	const { subscribe, set, update } = writable('id'); // Default to Indonesian

	return {
		subscribe,
		setLanguage: (lang) => {
			set(lang);
			if (browser) {
				localStorage.setItem('mentalwell_language', lang);
			}
		},
		set,
		init: () => {
			if (browser) {
				const stored = localStorage.getItem('mentalwell_language');
				if (stored) {
					set(stored);
				} else {
					// Default to Indonesian and save it
					set('id');
					localStorage.setItem('mentalwell_language', 'id');
				}
			}
		}
	};
}

export const currentLanguage = createLanguageStore();