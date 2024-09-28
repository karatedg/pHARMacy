const apiKey = 'f5EPWdawYG6i3gxTleIwRitj5Xb5KqM3CxkZhI5AfeE'; // Replace with your HERE API key

document.getElementById('getLocation').addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        doSomething(latitude, longitude);
        fetchNearbyHospitals(latitude, longitude);
    }, (error) => {
        console.error(error);
        document.getElementById('output').textContent = 'Error getting location: ' + error.message;
    });
});

function doSomething(lat, lon) {
    const output = `Latitude: ${lat}, Longitude: ${lon}`;
    document.getElementById('output').textContent = output;
}

function fetchNearbyHospitals(lat, lon) {
    const url = `https://discover.search.hereapi.com/v1/discover?at=${lat},${lon}&q=hospital&limit=5&apiKey=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const hospitals = data.items;
            const hospitalList = document.getElementById('hospitalList');
            hospitalList.innerHTML = ''; // Clear previous results

            if (hospitals.length === 0) {
                hospitalList.innerHTML = '<li>No hospitals found nearby.</li>';
                return;
            }

            hospitals.forEach(hospital => {
                const listItem = document.createElement('li');
                listItem.textContent = hospital.title; // Display the hospital name
                hospitalList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error fetching hospitals:', error);
            document.getElementById('hospitalList').innerHTML = '<li>Error fetching hospitals.</li>';
        });
}