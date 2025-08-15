<script lang="ts">
	import { geoToSvg } from '$lib/map';
	import Marker from '$lib/Marker.svelte';
	import { CityMap } from '$lib/cities';
	import mapSvg from '$lib/assets/country.svg';

	let { showAll, persistentCities = {}, pulseTokenByCity = {}, labelMode = 'always' } = $props<{
		showAll: boolean;
		persistentCities?: Record<string, boolean>;
		pulseTokenByCity?: Record<string, number>;
		labelMode?: 'always' | 'pulse' | 'never';
	}>();

	let mapContainer: HTMLElement | null = null;
	let mapImage: HTMLImageElement | null = null;
	let resizeObserver: ResizeObserver | null = null;
	let markers = $state<{ city: string; x: number; y: number }[]>([]);

	const cityMap = new CityMap();

	function updateMap() {
		updateMapDimensions();
		updateMarkers();
	}

	function updateMapDimensions() {
		const svgWidth = mapImage?.clientWidth || mapContainer?.clientWidth || 0;
		const svgHeight = mapImage?.clientHeight || mapContainer?.clientHeight || 0;
		if (svgWidth === 0 || svgHeight === 0) return;

		markers = cityMap.getCityNames().map((city) => {
			const cityCoords = cityMap.getCityCoordinates(city);
			if (!cityCoords) {
				return { city, x: 0, y: 0 };
			}
			const coords = geoToSvg(cityCoords.lat, cityCoords.lng, svgWidth, svgHeight);
			return { city, x: coords.x, y: coords.y };
		});
	}

	function createMarkers() {
		updateMarkers();
	}

	function updateMarkers() {}

	$effect(() => {
		// ensure we track mapContainer so this reruns once it's bound
		mapContainer;
		mapImage;

		updateMapDimensions();
		requestAnimationFrame(() => updateMap());

		const onResize = () => updateMap();
		window.addEventListener('resize', onResize);

		resizeObserver = new ResizeObserver(() => updateMap());
		if (mapContainer) resizeObserver.observe(mapContainer);
		if (mapImage) resizeObserver.observe(mapImage);

		if (mapImage) {
			if (mapImage.complete) {
				queueMicrotask(() => updateMap());
			} else {
				const onLoad = () => updateMap();
				mapImage.addEventListener('load', onLoad, { once: true });
			}
		}

		createMarkers();
		return () => {
			window.removeEventListener('resize', onResize);
			if (resizeObserver) {
				if (mapContainer) resizeObserver.unobserve(mapContainer);
				if (mapImage) resizeObserver.unobserve(mapImage);
				resizeObserver.disconnect();
				resizeObserver = null;
			}
		};
	});
</script>

<div bind:this={mapContainer} id="map-container" style="max-width: 100%;">
	<img bind:this={mapImage} id="map" src={mapSvg} alt="Switzerland Map" />
	{#each markers as marker}
		<Marker
			city={marker.city}
			x={marker.x}
			y={marker.y}
			show={showAll || !!persistentCities[marker.city]}
			pulseKey={pulseTokenByCity[marker.city] ?? 0}
			labelMode={labelMode}
		/>
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
