<script>
	import { darkMode, maxFlags } from '../routes/state.svelte';
	import Modal from './Modal.svelte';
	import { scrollY } from 'svelte/reactivity/window';
	let { filtered, data } = $props();
	import { crossfade, fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { quintOut } from 'svelte/easing';

	$inspect('mf', maxFlags.flagCount);
	$inspect('filtered length', filtered.length);
	let isModal = $state(false);
	let slide = $state();
	let currCountryCode = $state();
	let currCountryData = $state([]);
	let countryIndex = $state();
	$inspect('isModal', isModal);

	// $inspect('sy', scrollY.current);

	// function handleClick() {
	// 	maxFlags = maxFlags + 40;
	// }

	const [send, receive] = crossfade({
		fallback(node, params) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;

			return {
				duration: 500,
				easing: quintOut,
				css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
			};
		}
	});

	function scrollTop() {
		document.body.scrollTop = 0; // For Safari
		document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
		maxFlags.reset();
	}

	function handleClick(i, code) {
		isModal = true;
		slide = i;
		currCountryCode = code;
		countryIndex = data
			.map((d) => {
				return d.alpha3Code;
			})
			.indexOf(currCountryCode);
		currCountryData = data[countryIndex];
	}
</script>

<section id="grid" class="relative bg-none">
	<div class="mx-auto mt-8 h-fit w-screen sm:max-w-[360px] sm:p-4 lg:max-w-[1380px] lg:p-12">
		<div
			class="grid-container grid w-full select-none sm:grid-cols-1 sm:gap-10 lg:grid-cols-4 lg:gap-14 lg:px-8"
		>
			{#each filtered as country, i (country.numericCode)}
				{#if i < maxFlags.flagCount}
					<div
						in:receive={{ key: country.numericCode }}
						out:send={{ key: country.numericCode }}
						onclick={() => handleClick(i, country.alpha3Code)}
						class="{darkMode.isDark
							? 'bg-veryDarkBlue'
							: 'bg-white'} grid-item grid-[55%_45%] grid h-[320px] w-full cursor-pointer grid-cols-1 flex-col place-items-center shadow-lg transition-all hover:shadow-xl"
					>
						<div class="flag m-0 -mt-3 h-[160px] w-full p-0">
							<img src={country.flags.png} alt="" class="h-[180px] w-full" />
						</div>
						<div
							class="country-data grid h-full w-full grid-cols-1 grid-rows-1 items-start justify-center px-8 py-6 text-left {darkMode.isDark
								? 'text-veryLightGray'
								: 'text-veryDarkBlue'} transition-all"
						>
							<h2 class="country mt-1 text-pretty text-lg font-semibold leading-5">
								{country.name}
							</h2>
							<div class="text-block -mt-1 flex flex-col gap-1">
								<p class="text-sm font-light">
									<span class="font-medium">Population: </span>
									{country.population.toLocaleString()}
								</p>
								<p class="text-sm font-light">
									<span class="font-medium">Region: </span>
									{country.region.toLocaleString()}
								</p>
								<p class="text-sm font-light">
									<span class="font-medium">Capital: </span>
									{country.capital}
								</p>
							</div>
						</div>
					</div>
				{/if}
			{/each}
		</div>
		{#if filtered.length > maxFlags.flagCount}
			<div class=" mt-12 flex w-full items-center justify-center">
				<button
					onclick={() => maxFlags.addFlags()}
					class="text-white text-md mx-auto rounded-lg border-none {darkMode.isDark
						? 'bg-darkBlue'
						: 'bg-veryDarkBlue'} px-3 py-2">Load more</button
				>
			</div>
		{/if}
	</div>
	{#if scrollY.current > 420}
		<div
			transition:fade={{ duration: 200 }}
			onclick={() => scrollTop()}
			class="back-top text-white fixed right-5 top-5 cursor-pointer rounded-full border-none {darkMode.isDark
				? 'bg-darkGray'
				: 'bg-darkBlue'} px-4 py-2 text-lg font-semibold opacity-80"
		>
			Back to top ↑
		</div>
	{/if}
</section>

<Modal bind:isModal {filtered} {slide} {data} bind:currCountryCode {currCountryData} />

<style>
	.flag img {
		object-fit: cover;
		object-position: center;
	}
	button:hover {
		opacity: 80%;
	}

	.grid-item {
		transition: transform 0.12s ease;
		&:hover {
			transform: translateY(-2px) scale(1.025);
		}
	}
</style>
