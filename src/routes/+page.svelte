<script lang="ts">
	import Map from '$lib/Map.svelte';
	import Controls from '$lib/Controls.svelte';

	let showAll = false;

	function handleShowAll(event: Event) {
		showAll = (event.target as HTMLInputElement).checked;
	}
</script>

<main>
	<Map {showAll} />
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
