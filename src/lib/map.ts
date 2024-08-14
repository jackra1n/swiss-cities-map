export function geoToSvg(lat: number, lng: number, svgWidth: number, svgHeight: number) {
	const geoBounds = {
		minLat: 45.84, // Southernmost point
		maxLat: 47.8,  // Northernmost point
		minLng: 5.73,  // Westernmost point
		maxLng: 10.69  // Easternmost point
	};

	const yCorrectionFactor = 0.9;
	const yOffset = 25;

	const x = ((lng - geoBounds.minLng) / (geoBounds.maxLng - geoBounds.minLng)) * svgWidth;
	const y = ((geoBounds.maxLat - lat) / (geoBounds.maxLat - geoBounds.minLat)) * svgHeight * yCorrectionFactor + yOffset;

	return { x, y };
}
