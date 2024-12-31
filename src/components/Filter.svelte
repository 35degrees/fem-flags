<script>
	import Icon from '@iconify/svelte';
	import { darkMode } from '../routes/state.svelte';
	let { filter = $bindable() } = $props();
</script>

<section id="filter">
	<input
		bind:value={filter}
		type="text"
		placeholder="Search"
		class="input {darkMode.isDark ? 'bg-darkBlue' : 'bg-white'} {darkMode.isDark
			? 'text-white'
			: 'text-veryDarkBlue'} border-green-400 select-none rounded-lg border-2 py-1 pl-4 shadow-md sm:w-[280px] lg:w-[200px]"
	/>

	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="search-icon">
		<path
			fill={darkMode.isDark ? '#fff' : '#2b3945'}
			fill-rule="evenodd"
			d="M15.62 17.03a9 9 0 1 1 1.41-1.41l4.68 4.67a1 1 0 0 1-1.42 1.42l-4.67-4.68ZM17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
			clip-rule="evenodd"
		></path>
	</svg>

	<button onclick={() => (filter = '')} class="x-icon"
		><p class=" {darkMode.isDark ? 'text-white' : 'text-darkBlue'} ">X</p></button
	>
</section>

<!-- onchange={() => maxFlags.reset()} -->

<style>
	.input {
		transition: width 0.25s;
		outline: none;
		padding: 0.375em;
		padding-left: 1rem;
	}

	.input:focus-visible,
	button:focus-visible {
		box-shadow: 0 0 0 0.15rem rgb(74 222 128);
	}

	.input:focus,
	.input:not(:placeholder-shown) {
		width: 15em;
	}

	#filter {
		position: relative;
	}
	.search-icon,
	.x-icon {
		position: absolute;
		width: 1rem;
		height: 1rem;
		right: 0.55rem;
		top: 50%;
		translate: 0 -50%;
		opacity: 0;
		rotate: 90deg;
		pointer-events: none;
		visibility: hidden;
		border-radius: 0.25rem;
		transition-behavior: discrete;
		transition-property: opacity, rotate, visibility;
		transition-duration: 0.15s;
	}

	button {
		all: unset;
		cursor: pointer;
	}

	#filter:has(.input:placeholder-shown) .search-icon,
	#filter:has(.input:not(:placeholder-shown)) .x-icon {
		opacity: 1;
		pointer-events: all;
		visibility: visible;
		rotate: 0deg;
	}

	.x-icon {
		top: 44%;
	}

	@media (prefers-reduced-motion: reduce) {
		.input {
			transition: none;
		}
	}

	/* clears the ‘X’ from Internet Explorer */
	input[type='search']::-ms-clear,
	input[type='search']::-ms-reveal {
		appearance: none;
		width: 0;
		height: 0;
	}

	/* clears the ‘X’ from Chrome */
	input[type='search']::-webkit-search-decoration,
	input[type='search']::-webkit-search-cancel-button,
	input[type='search']::-webkit-search-results-button,
	input[type='search']::-webkit-search-results-decoration {
		appearance: none;
	}
</style>
