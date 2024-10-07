<script lang="ts">
	import { theme } from '../stores/theme';

	import Sun from "lucide-svelte/icons/sun";
  import Moon from "lucide-svelte/icons/moon";
	let isAnimating = false;

	const toggleTheme = () => {
		isAnimating = true;
		theme.update((t) => (t === 'light' ? 'dark' : 'light'));

		setTimeout(() => {
			isAnimating = false;
		}, 600);
	};
</script>

<button
	on:click={toggleTheme}
	class="ease-[cubic-bezier(0.4, 0, 0.2, 1)] relative flex items-center justify-center rounded-full bg-gray-200 p-2 text-black transition-all duration-500 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-offset-gray-800"
	aria-label="Switch to {$theme === 'light' ? 'dark' : 'light'} mode"
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
		{$theme === 'light'
					? Moon
					: Sun}
	{/if}
</button>
