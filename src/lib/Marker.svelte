<script lang="ts">
	let { city, x, y, show = false, pulseKey = 0, labelMode = 'always' } = $props<{
		city: string;
		x: number;
		y: number;
		show?: boolean; // continuous pulsing when true (or global showAll)
		pulseKey?: number; // bump to trigger a one-shot pulse
		labelMode?: 'always' | 'pulse' | 'never';
	}>();

	let oneShotActive = $state(false);

	$effect(() => {
		// when pulseKey changes, trigger a one-shot animation
		// by toggling a boolean that applies a class for a single cycle
		void pulseKey;
		if (pulseKey > 0) {
			oneShotActive = false;
			// next microtask to reflow class
			queueMicrotask(() => (oneShotActive = true));
			// remove after 2s (matches CSS animation duration)
			setTimeout(() => (oneShotActive = false), 2000);
		}
	});

	let isPulsing = $derived(show || oneShotActive);
	let showLabel = $derived(labelMode === 'always' ? true : labelMode === 'never' ? false : isPulsing);
</script>

<div class="marker" style="left: {x}px; top: {y}px;">
    <div class="droplet {show ? 'pulse' : ''} {oneShotActive ? 'pulse-once' : ''}" style="top: 0; left: 0; transform: translate(-50%, -50%);"></div>
	<div class="city-label {showLabel ? 'visible' : ''}" style="top: -10px; left: 20px;" aria-hidden={!showLabel}>
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

	/* default: hidden */
	.droplet::before,
	.droplet::after {
		display: none;
	}

	/* continuous pulse when .pulse is present */
	.droplet.pulse::before,
	.droplet.pulse::after {
		display: block;
	}

	/* one-shot pulse when .pulse-once is present (enabled for one cycle) */
	.droplet.pulse-once::before,
	.droplet.pulse-once::after {
		display: block;
		animation-iteration-count: 1;
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
		opacity: 0;
		transform: translateY(-2px);
		transition: opacity 250ms ease, transform 250ms ease;
		pointer-events: none;
		white-space: nowrap;
	}

	.city-label.visible {
		opacity: 1;
		transform: translateY(0);
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
