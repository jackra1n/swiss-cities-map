<script lang="ts">
	import { CityMap } from '$lib/cities';

	const cityMap = new CityMap();
	const cities = cityMap.getAllCities();

	let { onShowAll, onPulseCity, onToggleCity } = $props<{
		onShowAll: (event: Event) => void;
		onPulseCity: (city: string) => void;
		onToggleCity: (city: string, checked: boolean) => void;
	}>();

	function handleCheckboxChange(event: Event) {
		const target = event?.target as HTMLInputElement | null;
		const city = target?.dataset.city;
		if (!city) return;
		onToggleCity(city, !!target?.checked);
	}
</script>

<div class="controls-container">
	{#each Object.keys(cities) as city}
		<div>
			<button data-city={city} onclick={() => onPulseCity(city)}>
				Show {city.charAt(0).toUpperCase() + city.slice(1)}
			</button>
			<input type="checkbox" id={city} data-city={city} onchange={handleCheckboxChange} />
			<label for={city}>{city.charAt(0).toUpperCase() + city.slice(1)}</label>
		</div>
	{/each}
	<div>
		<input type="checkbox" id="showAll" onchange={onShowAll} />
		<label for="showAll">Show All</label>
	</div>
</div>

<style>
	.controls-container {
		display: grid;
	}

	.controls-container button {
		width: 120px;
	}
</style>
