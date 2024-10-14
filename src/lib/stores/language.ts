import { writable } from 'svelte/store';
import { getCookie, setCookie } from '$lib/utils/cookies';

const getInitialLanguage = () => {
	if (typeof window !== 'undefined') {
		const savedLanguage = getCookie('language');
		if (savedLanguage) {
			return savedLanguage;
		}

		const browserLanguage = navigator.language.startsWith('ru') ? 'ru' : 'en';
		return browserLanguage;
	}

	return 'en';
};

export const language = writable<string>(getInitialLanguage());

language.subscribe((value) => {
	if (typeof window !== 'undefined') {
		setCookie('language', value, 0, 'ma.cyou');
		document.documentElement.setAttribute('lang', value);
	}
});
