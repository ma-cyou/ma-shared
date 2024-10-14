<script lang="ts" context="module">
	interface SelectItem {
		label: string;
		labelRu: string;
		value: string;
	}

	export interface Setting {
		store: Writable<string>;
		name: string;
		nameRu: string;
		values: SelectItem[];
	}
</script>

<script lang="ts">
	import * as Select from '$lib/components/ui/select/index.js';

	import { theme } from '$lib/stores/theme';
	import { language } from '$lib/stores/language';
	import { onMount } from 'svelte';
	import type { Writable } from 'svelte/store';

	let settings: { [key: string]: Setting } = {
		theme: {
			store: theme,
			name: 'Theme',
			nameRu: 'Тема',
			values: [
				{ label: 'Light', labelRu: 'Светлая', value: 'light' },
				{ label: 'Dark', labelRu: 'Темная', value: 'dark' }
			]
		},
		language: {
			store: language,
			name: 'Lingo',
			nameRu: 'Язык',
			values: [
				{ label: 'English', labelRu: 'Английский', value: 'en' },
				{ label: 'Russian', labelRu: 'Русский', value: 'ru' }
			]
		}
	};

	export let additionalSettings: { [key: string]: Setting } | null = null;

	settings = { ...settings, ...(additionalSettings ?? {}) };

	let selectedValues: { [key: string]: SelectItem } = {};
	Object.entries(settings).forEach(([key, setting]) => {
		setting.store.subscribe((storeValue) => {
			selectedValues[key] =
				setting.values.find((value) => value.value === storeValue) || setting.values[0];
		});
	});

	$: updateSelects(selectedValues, $language);

	const updateSelects = (selected = selectedValues, languageStore = $language) => {
		Object.entries(settings).forEach(([key]) => {
			const select = document.getElementById(key + '-select');
			if (select) {
				select.innerHTML = languageStore === 'ru' ? selected[key].labelRu : selected[key].label;
			}
		});
	};

	onMount(() => {
		updateSelects();
	});
</script>

<div class="flex min-w-[240px] flex-col space-y-4 px-2 py-4 text-sm">
	{#each Object.entries(settings) as [key, setting]}
		<div class="flex items-center space-x-2">
			<p class="min-w-[48px]">{$language === 'ru' ? setting.nameRu : setting.name}:</p>
			<Select.Root
				selected={selectedValues[key]}
				onSelectedChange={(v) => {
					if (v) setting.store.set(v.value);
				}}
			>
				<Select.Trigger>
					<Select.Value
						id={key + '-select'}
						placeholder={$language === 'ru'
							? 'Выберите ' + setting.nameRu
							: 'Select ' + setting.name}
					/>
				</Select.Trigger>
				<Select.Content>
					{#each setting.values as value}
						<Select.Item value={value.value}>
							{$language === 'ru' ? value.labelRu : value.label}
						</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
		</div>
	{/each}
</div>
