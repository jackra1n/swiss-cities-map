<script lang="ts">
	import SwissMap from '$lib/Map.svelte';
	import Controls from '$lib/Controls.svelte';

	let showAll = $state(false);

	function handleShowAll(event: Event) {
		const target = event?.target as HTMLInputElement | null;
		showAll = !!target?.checked;
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

	<SwissMap {showAll} />
	<Controls onShowAll={handleShowAll} />
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
