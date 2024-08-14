<script lang="ts">
	export let city: string;
	export let x: number;
	export let y: number;

	$: labelPosition = { top: `${y - 10}px`, left: `${x + 20}px` };
	$: dropletPosition = { top: `${y}px`, left: `${x}px` };
</script>

<div class="marker">
	<div class="droplet" style={dropletPosition}></div>
	<div class="city-label" style={labelPosition}>{city.charAt(0).toUpperCase() + city.slice(1)}</div>
</div>

<style>
	.marker {
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
