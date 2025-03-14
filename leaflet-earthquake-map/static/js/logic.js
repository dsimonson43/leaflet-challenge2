// Create the 'basemap' tile layer (background map)
let basemap = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors"
});

// OPTIONAL: Create a 'street' tile layer for Step 2
let streetMap = L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenTopoMap contributors"
});

// Create the map object with Los Angeles as the center
let myMap = L.map("map", {
  center: [34.0522, -118.2437], // Los Angeles, CA
  zoom: 5,
  layers: [basemap] // Default layer
});

// Create Layer Groups for Earthquakes & Tectonic Plates
let earthquakes = new L.LayerGroup();
let tectonicPlates = new L.LayerGroup();

// Create Base Maps and Overlay Maps **BEFORE modifying them**
let baseMaps = {
  "Street Map": basemap,
  "Topographic Map": streetMap
};

let overlayMaps = {
  "Earthquakes": earthquakes
};

// Function to determine color based on depth
function getColor(depth) {
  return depth > 90  ? "#800026" : // dark red
         depth > 70  ? "#BD0026" : // bright red
         depth > 50  ? "#E31A1C" : // scarlett
         depth > 30  ? "#FC4E2A" : // safety orange
         depth > 10  ? "#FD8D3C" : // tangerine
                       "#FFEDA0";  // soft yellow
}

// Function to determine radius based on magnitude
function getRadius(magnitude) {
  return magnitude ? magnitude * 5 : 1;
}

// Function to return styling for each earthquake marker
function styleInfo(feature) {
  return {
      radius: getRadius(feature.properties.mag),
      fillColor: getColor(feature.geometry.coordinates[2]), // Depth-based color
      color: "#000", // Black border
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
  };
}

// Fetch Earthquake Data and Plot on Map
let earthquakeURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";
d3.json(earthquakeURL).then(function (data) {
  L.geoJson(data, {
      pointToLayer: function (feature, latlng) {
          return L.circleMarker(latlng);
      },
      style: styleInfo,
      onEachFeature: function (feature, layer) {
          layer.bindPopup(
              `<h3>${feature.properties.place}</h3>
              <hr>
              <p><strong>Magnitude:</strong> ${feature.properties.mag}</p>
              <p><strong>Depth:</strong> ${feature.geometry.coordinates[2]} km</p>
              <p><strong>Date:</strong> ${new Date(feature.properties.time)}</p>`
          );
      }
  }).addTo(earthquakes);

  earthquakes.addTo(myMap); // Add earthquake layer to map
});

// Fetch Tectonic Plate Boundaries and Add to Map
let plateURL = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";
d3.json(plateURL).then(function (plateData) {
  L.geoJson(plateData, {
      style: { color: "#FF4500", weight: 2 }
  }).addTo(tectonicPlates);

  // Fix: Ensure Tectonic Plates are included after data loads
  overlayMaps["Tectonic Plates"] = tectonicPlates;

  // Fix: RECREATE the layer control **after** tectonic plates are added
  L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(myMap);
});

// Create Legend for Depth Colors
let legend = L.control({ position: "bottomright" });

legend.onAdd = function () {
  let div = L.DomUtil.create("div", "info legend"),
      depths = [-10, 10, 30, 50, 70, 90];

  for (let i = 0; i < depths.length; i++) {
      div.innerHTML +=
          `<i style="background: ${getColor(depths[i] + 1)}"></i> ` +
          depths[i] + (depths[i + 1] ? "&ndash;" + depths[i + 1] + "<br>" : "+");
  }
  return div;
};

// Add the legend to the map
legend.addTo(myMap);