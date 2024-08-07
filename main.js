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
