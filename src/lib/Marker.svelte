<script lang="ts">
	export let city: string;
	export let x: number;
	export let y: number;
</script>

<div class="marker" style="left: {x}px; top: {y}px;">
	<div class="droplet" style="top: 0; left: 0; transform: translate(-50%, -50%);"></div>
	<div class="city-label" style="top: -10px; left: 20px;">
		{city.charAt(0).toUpperCase() + city.slice(1)}
	</div>
</div>

<style>
	.marker {
		position: absolute;
	}

	.droplet {
		position: absolute;
		width: 20px;
		height: 20px;
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
		animation: dotFade 2s infinite;
	}

	.droplet::after {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		width: 20px;
		height: 20px;
		background: rgba(0, 123, 255, 0.6);
		border-radius: 50%;
		transform: translate(-50%, -50%);
		animation: drop 2s infinite;
	}

	.city-label {
		position: absolute;
		background: rgba(0, 0, 0, 0.7);
		color: white;
		padding: 2px 5px;
		border-radius: 3px;
		transition: opacity 1s;
		pointer-events: none;
		white-space: nowrap;
	}

	@keyframes drop {
		0% {
			transform: translate(-50%, -50%) scale(0.5);
			opacity: 1;
		}
		50% {
			opacity: 0.75;
		}
		100% {
			transform: translate(-50%, -50%) scale(2);
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
