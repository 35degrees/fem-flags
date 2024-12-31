<script>
	import { darkMode } from './state.svelte';
	import { onMount } from 'svelte';
	import Nav from '../components/Nav.svelte';
	import SearchBox from '../components/SearchBox.svelte';
	import FlagGrid from '../components/FlagGrid.svelte';
	import data from '/src/lib/data.json';

	let filter = $state('');
	let selected = $state();
	let updatedData = $state([]);
	$inspect('selected', selected);
	$inspect('ud', updatedData);
	$inspect(filter);

	$effect(() => {
		if (selected === 'All countries') {
			updatedData = data;
		} else {
			updatedData = data.filter((d) => d.region === selected);
		}
	});

	let filtered = $derived(
		updatedData.filter((u) => u.name.toLowerCase().includes(filter.toLowerCase()))
	);
</script>

<svelte:head>
	{#if darkMode.isDark}
		<style>
			body {
				background-color: hsl(200, 15%, 8%);
				transition: background-color 150ms ease;
			}
		</style>
	{:else}
		<style>
			body {
				background-color: hsl(0, 0%, 98%);
				transition: background-color 150ms ease;
			}
		</style>
	{/if}
</svelte:head>

<Nav />
<SearchBox {data} bind:filter bind:selected />
<FlagGrid {filtered} data={updatedData} />
