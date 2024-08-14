<script lang="ts">
	import { cities } from '$lib/cities';

	export let onShowAll: (event: Event) => void;  // Callback prop for handling the "Show All" event

	function handleCheckboxChange(event: Event) {
		onShowAll(event);
	}
</script>

<div class="controls-container">
	{#each Object.keys(cities) as city}
		<div>
			<button data-city={city}>Show {city.charAt(0).toUpperCase() + city.slice(1)}</button>
			<input type="checkbox" id={city} data-city={city} />
			<label for={city}>{city.charAt(0).toUpperCase() + city.slice(1)}</label>
		</div>
	{/each}
	<div>
		<input type="checkbox" id="showAll" on:change={handleCheckboxChange} />
		<label for="showAll">Show All</label>
	</div>
</div>

<style>
	.controls-container {
		display: grid;
		place-items: center;
	}
</style>
