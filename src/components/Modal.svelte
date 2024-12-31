<script>
	import { onMount } from 'svelte';
	import { darkMode } from '../routes/state.svelte';
	import { fade, fly } from 'svelte/transition';
	let {
		filtered,
		isModal = $bindable(),
		slide,
		data,
		currCountryCode = $bindable(),
		currCountryData = $bindable()
	} = $props();
	let currCount = 0;
	let cIndex = $state();
	let nextCountryCode = $state();
	let fullName = $state('');
	let thisIndex = $state();
	let key = $state();

	function handleExit() {
		isModal = false;
	}

	$inspect('smoo', currCountryData);

	function handleClick(border) {
		console.log('b', border);
		cIndex = data
			.map((d) => {
				return d.alpha3Code;
			})
			.indexOf(border);
		currCountryData = data[cIndex];
	}

	function findCountryName(border) {
		let thisIndex = data
			.map((d) => {
				return d.alpha3Code;
			})
			.indexOf(border);
		return data[thisIndex].name;
	}
	$inspect(fullName);

	function onkeydown(e) {
		isModal ? (key = e.key) : key;
		if (key === 'Escape') {
			isModal = false;
		}
	}
</script>

<svelte:window {onkeydown} />

{#if isModal}
	<div
		in:fade={{ duration: 280 }}
		out:fade={{ duration: 200 }}
		class="modal fixed mx-auto flex w-full sm:items-start sm:justify-center lg:items-center lg:justify-center {darkMode.isDark
			? 'bg-[#111517f2]'
			: 'bg-[#858585f4]'} p-24"
	>
		{#key cIndex}
			<div
				in:fly={{ x: 400, duration: 280, delay: 280 }}
				out:fly={{ x: -400, duration: 280 }}
				class="flex items-center justify-between opacity-100 sm:flex-col sm:gap-1 lg:flex-row lg:gap-16"
			>
				<div class="flag-image relative select-none">
					<img src={currCountryData.flags.png} alt="" class="sm:w-[360px] lg:w-[550px]" />
					<!-- <img src={filtered[slide].flag} alt="" /> -->
					<div
						onclick={() => handleExit()}
						class="back-button text-white absolute -top-20 left-0 cursor-pointer rounded-xl px-4 py-2 opacity-80 hover:opacity-90 {darkMode.isDark
							? 'bg-darkGray'
							: 'bg-darkBlue'}"
					>
						← Back
					</div>
				</div>
				<div
					class="modal-text flex select-none flex-col items-start justify-center gap-4 text-left sm:w-[360px] sm:p-2 lg:w-[500px]"
				>
					<h1 class="text-white text-left sm:text-2xl lg:text-4xl">{currCountryData.name}</h1>
					<div
						class="modal-stats text-white sm:text-md flex sm:flex-col sm:gap-0 sm:p-2 lg:w-[500px] lg:flex-row lg:gap-4 lg:text-lg"
					>
						<div
							class="stats-left flex flex-col font-light sm:w-[360px] sm:w-full sm:gap-0 lg:w-2/3 lg:gap-1"
						>
							<p><span class="font-semibold">Capital: </span> {currCountryData.capital}</p>
							<!-- <p><span class="font-semibold">Capital: </span> {filtered[slide].capital}</p> -->
							<p><span class="font-semibold">Region: </span> {currCountryData.region}</p>
							<p>
								<span class="font-semibold">Population: </span>
								{currCountryData.population.toLocaleString()}
							</p>
						</div>
						<div class="stats-right flex flex-col gap-1 sm:w-full sm:gap-0 lg:w-3/4 lg:gap-1">
							<p>
								<span class="font-semibold">Top-level Domain: </span>
								{currCountryData.topLevelDomain}
							</p>
							<p class="inline-block">
								<span class=" font-semibold">Currencies: </span>
								{#each currCountryData.currencies as currency, i}
									{#if i === 1},
									{/if}
									{currency.name}
									<!-- {#if i < currency.length}
									<p>,</p>
								{/if} -->
								{/each}
							</p>
							<p class="inline-block">
								<span class=" font-semibold">Languages: </span>
								{#each currCountryData.languages as language, i}
									{#if i >= 1},
									{/if}
									{language.name}
									<!-- {#if i < currency.length}
									<p>,</p>
								{/if} -->
								{/each}
							</p>
						</div>
					</div>

					<div class="flex flex-col items-start justify-start gap-2 px-2">
						{#if currCountryData.borders}
							<h4 class="text-white justify-start font-semibold">Border countries:</h4>

							<div
								class="test flex max-w-[460px] flex-row flex-wrap items-center justify-start pl-4 sm:gap-1 lg:gap-2"
							>
								{#each currCountryData.borders as border, i}
									<div
										onclick={() => handleClick(border)}
										class="text-white flex cursor-pointer items-center justify-center rounded-lg sm:text-sm lg:text-[1rem] {darkMode.isDark
											? 'bg-darkGray'
											: 'bg-darkBlue'} px-4 py-2 opacity-80 hover:opacity-90"
									>
										{findCountryName(border)}
									</div>
								{/each}
							</div>
						{/if}
					</div>
				</div>
			</div>
		{/key}
	</div>
{/if}

<style>
	.exit-button {
		position: fixed;
		z-index: 65;
		top: 2%;
		right: 3%;
		font-size: 2.8rem;
		color: #fff;
		fill: #fff;
		opacity: 80%;
		cursor: pointer;
		&:hover {
			opacity: 100%;
		}
	}
	.modal {
		height: 100vh;
		width: 100vw;
		top: 0;
		left: 0;
		overflow: hidden;
		z-index: 10;
		overflow-y: hidden;
		overflow-x: hidden;
	}
	.flag-image img {
		object-fit: contain;
		object-position: center;
	}
</style>
