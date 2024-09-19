<script lang="ts">
	import { onMount } from 'svelte';
	import { geoToSvg } from '$lib/map';
	import Marker from '$lib/Marker.svelte';
	import { CityMap } from '$lib/cities';
	import mapSvg from '$lib/assets/country.svg';

	let mapContainer: HTMLElement;
	let markers: { city: string; x: number; y: number }[] = [];

	const cityMap = new CityMap();

	onMount(() => {
		window.addEventListener('resize', updateMapDimensions);
		updateMapDimensions();

		return () => {
			window.removeEventListener('resize', updateMapDimensions);
		};
	});

	function updateMapDimensions() {
		const svgWidth = mapContainer.clientWidth;
		const svgHeight = mapContainer.clientHeight;

		markers = cityMap.getCityNames().map((city) => {
			const coords = geoToSvg(cityMap.getCityCoordinates(city)!.lat, cityMap.getCityCoordinates(city)!.lng, svgWidth, svgHeight);
			return { city, x: coords.x, y: coords.y };
		});
	}
</script>

<div bind:this={mapContainer} id="map-container" style="max-width: 100%;">
	<img id="map" src="{mapSvg}" alt="Switzerland Map" />
	{#each markers as marker}
		<Marker city={marker.city} x={marker.x} y={marker.y} />
	{/each}
</div>

<style>
	#map-container {
		position: relative;
		width: 800px;
		margin: 0 auto;
	}

	#map {
		width: 100%;
		height: auto;
	}
</style>
