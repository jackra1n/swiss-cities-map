<script lang="ts">
	import { onMount } from 'svelte';
	import { geoToSvg } from '$lib/map';
	import { cities } from '$lib/cities';
	import Marker from '$lib/Marker.svelte';

	let mapContainer: HTMLElement;
	let markers: { city: string; x: number; y: number }[] = [];

	onMount(() => {
		updateMapDimensions();
		window.addEventListener('resize', updateMap);
		createMarkers();

		return () => {
			window.removeEventListener('resize', updateMap);
		};
	});

	function updateMap() {
		updateMapDimensions();
		updateMarkers();
	}

	function updateMapDimensions() {
		const svgWidth = mapContainer.clientWidth;
		const svgHeight = mapContainer.clientHeight;

		markers = Object.keys(cities).map(city => {
			const coords = geoToSvg(cities[city].lat, cities[city].lng, svgWidth, svgHeight);
			return { city, x: coords.x, y: coords.y };
		});
	}

	function createMarkers() {
		updateMarkers();
	}

	function updateMarkers() {
		// No need to manually clear markers since we're updating the reactive variable
		markers = markers;
	}
</script>

<div bind:this={mapContainer} id="map-container">
	<img id="map" src="/country.svg" alt="Switzerland Map" />
	{#each markers as marker}
		<Marker city={marker.city} x={marker.x} y={marker.y} />
	{/each}
</div>

<style>
	#map-container {
		position: relative;
		width: 100%;
		height: auto;
		max-width: 800px;
		margin: 0 auto;
	}
</style>
