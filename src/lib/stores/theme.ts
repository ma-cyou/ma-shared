import { writable } from 'svelte/store';
import { getCookie, setCookie } from '$lib/utils/cookies';

const getInitialTheme = () => {
	if (typeof window !== 'undefined') {
		const savedTheme = getCookie('theme');
		if (savedTheme) {
			return savedTheme;
		}

		const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
		return prefersDarkScheme ? 'dark' : 'light';
	}

	return 'light';
};

export const theme = writable<string>(getInitialTheme());

theme.subscribe((value) => {
	if (typeof window !== 'undefined') {
		setCookie('theme', value, 0, 'ma.cyou');
		document.documentElement.classList.toggle('dark', value === 'dark');
	}
});
