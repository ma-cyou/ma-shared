<script lang="ts">
	import { language } from '../stores/language';
	let isAnimating = false;

	const toggleLanguage = () => {
		isAnimating = true;
		language.update((lang) => (lang === 'en' ? 'ru' : 'en'));

		setTimeout(() => {
			isAnimating = false;
		}, 600);
	};
</script>

<button
	on:click={toggleLanguage}
	class="ease-[cubic-bezier(0.4, 0, 0.2, 1)] relative flex items-center justify-center rounded-full bg-gray-200 p-2 text-black transition-all duration-500 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
	aria-label="Switch to {$language === 'en' ? 'Russian' : 'English'}"
>
	{#if isAnimating}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-6 w-6 animate-spin opacity-80 transition-opacity duration-500"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636"
			/>
		</svg>
	{:else}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="ease-[cubic-bezier(0.4, 0, 0.2, 1)] h-6 w-6 opacity-100 transition-opacity transition-transform duration-500 duration-[700ms]"
			viewBox="0 0 640 480"
			fill="none"
			stroke="currentColor"
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
			style:transform="rotate({$language === 'en' ? 0 : 180}deg)"
		>
			{#if $language === 'en'}
				<path fill="#fff" d="M0 0h640v160H0z" />
				<path fill="#0039a6" d="M0 160h640v160H0z" />
				<path fill="#d52b1e" d="M0 320h640v160H0z" />
			{:else}
				<path fill="#012169" d="M0 0h640v480H0z" />
				<path
					fill="#FFF"
					d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0z"
				/>
				<path
					fill="#C8102E"
					d="m424 281 216 159v40L369 281zm-184 20 6 35L54 480H0zM640 0v3L391 191l2-44L590 0zM0 0l239 176h-60L0 42z"
				/>
				<path fill="#FFF" d="M241 0v480h160V0zM0 160v160h640V160z" />
				<path fill="#C8102E" d="M0 193v96h640v-96zM273 0v480h96V0z" />
			{/if}
		</svg>
	{/if}
</button>
