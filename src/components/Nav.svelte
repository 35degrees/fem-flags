<script>
	import Icon from '@iconify/svelte';
	import { fade } from 'svelte/transition';
	import { darkMode } from '../routes/state.svelte';
	$inspect('dark', darkMode.isDark);
</script>

<div
	class="nav shadow-lg transition-all {darkMode.isDark
		? 'bg-darkBlue'
		: 'bg-white'} {darkMode.isDark ? '' : 'shadow-[#ccc]'} "
>
	<div class="container mx-auto h-fit w-screen p-4">
		<section id="nav" class=" flex w-full flex-row items-center justify-between">
			<h1
				class="select-none text-xl font-bold transition-all {darkMode.isDark
					? 'text-white'
					: 'text-superDarkBlue'}"
			>
				Where in the world?
			</h1>
			<div
				onclick={() => darkMode.toggleDarkMode()}
				class="light-dark-icon cursor-pointer"
				transition:fade={{ duration: 1000 }}
			>
				{#if darkMode.isDark}
					<Icon
						icon="mingcute:sun-fill"
						width="24"
						height="24"
						style="color: rgba(252, 253, 45, 0.8183648459383753)"
					/>
				{:else}
					<Icon
						icon="material-symbols:dark-mode-rounded"
						width="24"
						height="24"
						style="color: hsl(200,15%,8%)"
					/>
				{/if}
			</div>
		</section>
	</div>
</div>

<style>
	.nav {
		color: #8dc4ff;
	}
</style>
