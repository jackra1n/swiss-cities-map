<script lang="ts">
	import { onMount } from 'svelte';
	import { geoToSvg } from '$lib/map';
	import { cities } from '$lib/cities';

	let mapContainer: HTMLElement;
	let svgWidth: number = 800;
	let svgHeight: number = 513;

	onMount(() => {
		window.addEventListener('resize', updateMap);
		createMarkers();

		return () => {
			window.removeEventListener('resize', updateMap);
		};
	});

	function updateMap() {
		svgWidth = mapContainer.clientWidth;
		svgHeight = mapContainer.clientHeight;
		updateMarkers();
	}

	function createMarkers() {
		Object.keys(cities).forEach((city) => {
			const coords = geoToSvg(cities[city].lat, cities[city].lng, svgWidth, svgHeight);
			createMarker(city, coords);
		});
	}

	function createMarker(city: string, coords: { x: number; y: number }) {
		const droplet = document.createElement('div');
		droplet.classList.add('droplet');
		droplet.style.top = `${coords.y}px`;
		droplet.style.left = `${coords.x}px`;

		const label = document.createElement('div');
		label.classList.add('city-label');
		label.style.top = `${coords.y - 10}px`;
		label.style.left = `${coords.x + 20}px`;
		label.textContent = city.charAt(0).toUpperCase() + city.slice(1);

		mapContainer.appendChild(droplet);
		mapContainer.appendChild(label);
	}

	function updateMarkers() {
		mapContainer.innerHTML = ''; // Clear existing markers
		createMarkers();
	}
</script>

<div bind:this={mapContainer} id="map-container">
	<img id="map" src="/country.svg" alt="Switzerland Map" />
</div>

<style>
	#map-container {
		position: relative;
		width: 100%;
		height: auto;
		max-width: 800px;
		margin: 0 auto;
	}

	.droplet,
	.city-label {
		display: none;
		position: absolute;
	}

	.droplet::before {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		width: 5px;
		height: 5px;
		background: rgb(0, 123, 255);
		border-radius: 50%;
		transform: translate(-50%, -50%);
		animation: dotFade 2s forwards;
	}

	.droplet::after {
		content: '';
		position: absolute;
		top: -10px;
		left: -10px;
		width: 20px;
		height: 20px;
		background: rgba(0, 123, 255, 0.6);
		border-radius: 50%;
		animation: drop 2s forwards;
	}

	@keyframes drop {
		0% {
			transform: scale(0.5);
			opacity: 1;
		}
		50% {
			opacity: 0.75;
		}
		100% {
			transform: scale(2);
			opacity: 0;
		}
	}

	@keyframes dotFade {
		0% {
			opacity: 1;
		}
		80% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
</style>
