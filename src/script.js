
const map = L.map('map').setView([-25.7461, 28.1881], 10); // Centered on Pretoria


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Example GeoJSON data for watersheds (simplified example)
const watersheds = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {"name": "Pretoria Watershed", "pollutionLevel": "High"},
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[28.1, -25.7], [28.2, -25.7], [28.2, -25.8], [28.1, -25.8], [28.1, -25.7]]]
      }
    }
    // 
  ]
};


L.geoJSON(watersheds, {
  style: function(feature) {
    return {color: feature.properties.pollutionLevel === "High" ? "red" : "green"};
  },
  onEachFeature: function(feature, layer) {
    layer.on('click', function() {
      document.getElementById('info-text').innerText = `Watershed: ${feature.properties.name}\nPollution Level: ${feature.properties.pollutionLevel}`;
    });
  }
}).addTo(map);
