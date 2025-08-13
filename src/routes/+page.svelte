<script lang="ts">
	import SwissMap from '$lib/Map.svelte';
	import Controls from '$lib/Controls.svelte';

	let showAll = $state(false);
	let persistentCities = $state<Record<string, boolean>>({});
	let pulseTokenByCity = $state<Record<string, number>>({});
	let labelMode = $state<'always' | 'pulse' | 'never'>('pulse');

	function handleShowAll(event: Event) {
		const target = event?.target as HTMLInputElement | null;
		showAll = !!target?.checked;
	}

	function handlePulseCity(city: string) {
		// increment a token to trigger a one-shot pulse for this city
		pulseTokenByCity = { ...pulseTokenByCity, [city]: (pulseTokenByCity[city] ?? 0) + 1 };
	}

	function handleToggleCity(city: string, checked: boolean) {
		persistentCities = { ...persistentCities, [city]: checked };
	}
</script>

<main>
	<div style="text-align: center; margin: 2rem;">
		<div style="margin-bottom: 1rem;">
			This project is a simple example of how to use SVG and JavaScript to create an interactive map.
			I wanted to be able to show an event on a map so created this project to try make the first version.
			Below you can find buttons that when pressed will simulate a single "event" on the map or checkboxes that will keep showing said city.
		</div>
		<div style="font-weight: bold;">If you want, you can check out the project on <a href="https://github.com/jackra1n/swiss-cities-map">GitHub</a></div>
	</div>

	<div style="margin: 1rem 0; display: flex; gap: 0.75rem; align-items: center;">
		<label for="labelMode">Label mode:</label>
		<select id="labelMode" bind:value={labelMode}>
			<option value="always">Always</option>
			<option value="pulse">On pulse</option>
			<option value="never">Never</option>
		</select>
	</div>

	<SwissMap {showAll} {persistentCities} {pulseTokenByCity} {labelMode} />
	<Controls onShowAll={handleShowAll} onPulseCity={handlePulseCity} onToggleCity={handleToggleCity} />
</main>

<style>
	main {
		font-family: Montserrat, sans-serif;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
