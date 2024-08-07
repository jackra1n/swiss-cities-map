const svgWidth = 800;
const svgHeight = 513;

const geoBounds = {
    minLat: 45.82,  // Southernmost point
    maxLat: 47.8,  // Northernmost point
    minLng: 5.8,   // Westernmost point
    maxLng: 10.7  // Easternmost point
};

const yCorrectionFactor = 0.9;
const yOffset = 25;

function geoToSvg(lat, lng) {
    const x = ((lng - geoBounds.minLng) / (geoBounds.maxLng - geoBounds.minLng)) * svgWidth;
    const y = ((geoBounds.maxLat - lat) / (geoBounds.maxLat - geoBounds.minLat)) * svgHeight * yCorrectionFactor + yOffset;
    return { x, y };
}

const cities = {
    zurich: { lat: 47.377, lng: 8.54 },
    geneva: { lat: 46.2044, lng: 6.1432 },
    basel: { lat: 47.549, lng: 7.5886 },
    bern: { lat: 46.9481, lng: 7.4474 },
    lucerne: { lat: 47.0502, lng: 8.3093 },
    chur: { lat: 46.8523, lng: 9.5300 },
    locarno: { lat: 46.1706, lng: 8.7995 },
    sion: { lat: 46.228, lng: 7.359 }
};


function createMarkers() {
    const mapContainer = document.getElementById('map-container');
    for (const city in cities) {
        const coords = geoToSvg(cities[city].lat, cities[city].lng);
        
        // Create droplet
        const droplet = document.createElement('div');
        droplet.classList.add('droplet');
        droplet.dataset.city = city;
        droplet.style.top = `${coords.y}px`;
        droplet.style.left = `${coords.x}px`;

        // Create label
        const label = document.createElement('div');
        label.classList.add('city-label');
        label.dataset.city = city;
        label.style.top = `${coords.y - 10}px`;
        label.style.left = `${coords.x + 20}px`;
        label.textContent = city.charAt(0).toUpperCase() + city.slice(1);

        mapContainer.appendChild(droplet);
        mapContainer.appendChild(label);
    }
}

document.addEventListener('DOMContentLoaded', createMarkers);

function handleEvent(event) {
    const city = event.target.dataset.city;
    if (city) {
        showDroplet(city);
    }
}

function handleCheckboxEvent(event) {
    const city = event.target.dataset.city;
    if (city) {
        const droplet = document.querySelector(`.droplet[data-city="${city}"]`);
        const label = document.querySelector(`.city-label[data-city="${city}"]`);
        const button = document.querySelector(`button[data-city="${city}"]`);
        if (event.target.checked) {
            if (droplet && label) {
                droplet.style.display = 'block';
                droplet.classList.add('loop');
                label.style.display = 'block';
                label.style.opacity = '1';
            }
            if (button) {
                button.disabled = true;
            }
        } else {
            if (droplet && label) {
                droplet.style.display = 'none';
                droplet.classList.remove('loop');
                label.style.display = 'none';
                label.style.opacity = '0';
            }
            if (button) {
                button.disabled = false;
            }
        }
    }
}

function showDroplet(city) {
    const allDroplets = document.querySelectorAll('.droplet');
    const allLabels = document.querySelectorAll('.city-label');
    allDroplets.forEach(droplet => {
        if (!droplet.classList.contains('loop')) {
            droplet.style.display = 'none';
            droplet.classList.remove('show');
        }
    });
    allLabels.forEach(label => {
        if (!label.previousElementSibling.classList.contains('loop')) {
            label.style.display = 'none';
            label.classList.remove('show');
        }
    });

    const droplet = document.querySelector(`.droplet[data-city="${city}"]`);
    const label = document.querySelector(`.city-label[data-city="${city}"]`);
    if (droplet && label) {
        droplet.style.display = 'block';
        droplet.classList.add('show');
        label.style.display = 'block';
        label.style.opacity = '1';

        setTimeout(() => {
            if (!droplet.classList.contains('loop')) {
                droplet.style.display = 'none';
                label.style.opacity = '0';
            }
        }, 1000);
    }
}

function showAllCities() {
    for (const city in cities) {
        showDroplet(city);
    }
}
