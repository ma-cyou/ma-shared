<script lang="ts">
	import Menu from 'lucide-svelte/icons/menu';
	import Cog from 'lucide-svelte/icons/cog';
	import CircleUser from 'lucide-svelte/icons/circle-user';

	import { Button } from './ui/button/index.js';
	import * as DropdownMenu from './ui/dropdown-menu/index.js';
	import * as Sheet from './ui/sheet/index.js';
	import * as Avatar from './ui/avatar/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';

	import defaultSettings, { type Setting } from './Settings.svelte';
	import defaultLogo from './Logo.svelte';

	import { page } from '$app/stores';
	import { language } from '$lib/stores/language';
	import type { Component } from 'svelte';

	let clazz = '';
	export { clazz as class };
	export let navLinks: { [key: string]: { name: string; nameRu: string } } = {
		'/': { name: 'Home', nameRu: 'Главная' }
	};

	export let title: string = 'macyou';
	export let titleLink: string = 'https://ma.cyou';
	export let Logo: Component = defaultLogo;
	export let additionalSettings: { [key: string]: Setting } | null = null;
	export let Settings: Component | null = defaultSettings;
	export let AdditionalSettings: Component | null = null;
	export let profile: boolean = true;

	let activeLink: string = '';
	$: activeLink = $page.url.pathname;
</script>

<header
	class="{clazz !== ''
		? ' ' + clazz
		: ''}z-10 sticky inset-0 flex h-14 w-screen items-center gap-2 border-b bg-background px-2 md:h-16 md:gap-4 md:px-4"
>
	<nav class="hidden gap-6 text-base font-medium md:flex md:items-center md:gap-4 lg:gap-6">
		<a href={titleLink} class="flex items-center gap-2 text-lg font-semibold">
			<Logo class="h-8 w-8 fill-current text-black dark:text-white" />
			<p class="pb-0.5">{title}</p>
		</a>
		<Separator orientation="vertical" class="h-6 bg-muted-foreground bg-opacity-50" />
		{#each Object.entries(navLinks) as [key, link]}
			<a
				href={key}
				class="{activeLink === key
					? 'text-foreground'
					: 'text-muted-foreground'} transition-colors hover:text-foreground"
			>
				{$language === 'ru' ? link.nameRu : link.name}
			</a>
		{/each}
	</nav>
	<Sheet.Root>
		<Sheet.Trigger asChild let:builder>
			<Button variant="outline" size="icon" class="shrink-0 md:hidden" builders={[builder]}>
				<Menu class="h-6 w-6" />
				<span class="sr-only">
					{$language === 'ru' ? 'Показать меню навигации' : 'Toggle navigation menu'}
				</span>
			</Button>
		</Sheet.Trigger>
		<div class="flex items-center gap-2 font-semibold md:hidden">
			<Logo class="h-8 w-8 fill-current text-black dark:text-white" />
			<p>
				{$language === 'ru'
					? navLinks[activeLink]?.nameRu || activeLink.split('/')[activeLink.split('/').length - 2]
					: navLinks[activeLink]?.name || activeLink.split('/')[activeLink.split('/').length - 2]}
			</p>
		</div>
		<Sheet.Content side="left">
			<nav class="grid gap-6 text-lg font-medium">
				<a href={titleLink} class="flex items-center gap-2 text-lg font-semibold md:text-base">
					<Logo class="h-8 w-8 fill-current text-black dark:text-white" />
					<p>{title}</p>
				</a>
				{#each Object.entries(navLinks) as [key, link]}
					<a
						href={key}
						class="{activeLink === key
							? 'text-foreground'
							: 'text-muted-foreground'} transition-colors hover:text-foreground"
						on:click={key === '/'
							? (e) => {
									e.preventDefault();
									window.location.href = '/';
								}
							: undefined}
					>
						{$language === 'ru' ? link.nameRu : link.name}
					</a>
				{/each}
			</nav>
		</Sheet.Content>
	</Sheet.Root>
	{#if Settings !== null || profile !== null}
		<div class="ml-auto flex items-center gap-2 md:gap-2 lg:gap-4">
			{#if Settings !== null}
				<DropdownMenu.Root>
					<DropdownMenu.Trigger asChild let:builder>
						<Button builders={[builder]} variant="outline" size="icon">
							<Cog class="h-6 w-6" />
							<span class="sr-only"
								>{$language === 'ru' ? 'Показать меню настроек' : 'Toggle settings menu'}</span
							>
						</Button>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content align="end">
						<DropdownMenu.Label class="text-center text-sm font-semibold">
							{$language === 'ru' ? 'Настройки' : 'Settings'}
						</DropdownMenu.Label>
						<DropdownMenu.Separator />
						{#if additionalSettings !== null}
							<Settings {additionalSettings} />
						{:else}
							<Settings />
						{/if}
						{#if AdditionalSettings !== null}
							<svelte:component this={AdditionalSettings as Component} />
						{/if}
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			{/if}
			{#if profile}
				<DropdownMenu.Root>
					<DropdownMenu.Trigger asChild let:builder>
						<Button
							builders={[builder]}
							variant="secondary"
							size="icon"
							class="animate-pulse rounded-full"
						>
							<!-- <Avatar.Root class="h-9 w-9">
								<Avatar.Image src="https://github.com/mapagmataas1331.png" alt="@mapagmataas1331" />
								<Avatar.Fallback>CN</Avatar.Fallback>
							</Avatar.Root> -->
							<CircleUser class="h-5 w-5" />
							<span class="sr-only">
								{$language === 'ru' ? 'Показать меню пользователя' : 'Toggle user menu'}
							</span>
						</Button>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content align="end">
						<DropdownMenu.Label class="text-center text-sm font-semibold">
							{$language === 'ru' ? 'Меню пользователя' : 'User menu'}
						</DropdownMenu.Label>
						<DropdownMenu.Separator />
						<DropdownMenu.Item>{$language === 'ru' ? 'Профиль' : 'Profile'}</DropdownMenu.Item>
						<DropdownMenu.Separator />
						<DropdownMenu.Item>{$language === 'ru' ? 'Выход' : 'Logout'}</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			{/if}
		</div>
	{/if}
</header>
