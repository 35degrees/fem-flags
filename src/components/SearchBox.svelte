<script>
	import { darkMode } from '../routes/state.svelte';
	import Filter from './Filter.svelte';
	import Select from './Select.svelte';
	let { data, filter = $bindable(), selected = $bindable() } = $props();
</script>

<section id="searchBox" class="bg-none">
	<div class="container mx-auto mt-12 h-fit w-screen sm:px-12 lg:px-20">
		<div
			class="box-container flex sm:ml-1 sm:flex-col sm:items-start sm:justify-center sm:gap-4 lg:flex-row lg:items-center lg:justify-between"
		>
			<Filter {data} bind:filter />
			<Select {data} bind:selected />
		</div>
	</div>
</section>
