<script>
	import { SvelteSet } from 'svelte/reactivity';
	import { darkMode } from '../routes/state.svelte';
	let { data, selected = $bindable() } = $props();
	// $inspect(data);
	let regionOptions = new SvelteSet(data.map((d) => d.region));
	$inspect(regionOptions);
	let regionArray = Array.from(regionOptions).splice(0, 5);
	regionArray.unshift('All countries');
	$inspect('regionArr', regionArray);
</script>

<section id="select">
	<select
		name="menu"
		id="menu"
		bind:value={selected}
		class="border-green-400 rounded-lg border-2 px-3 py-1 transition-all sm:w-[280px] lg:w-[200px] {darkMode.isDark
			? 'bg-darkBlue'
			: 'bg-white'}
			{darkMode.isDark ? 'text-white' : 'text-veryDarkBlue'} select-none"
		placeholder="Filter by region"
	>
		{#each regionArray as item}
			<option value={item}>
				{item}
			</option>
		{/each}
	</select>
</section>

<style>
	select {
		outline: none;
	}

	select:focus {
		box-shadow: 0 0 0 0.1rem rgb(74 222 128);
	}
</style>
