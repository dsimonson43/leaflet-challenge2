#### leaflet-challenge (Significant earthquakes// past 30 days####
# OVERVIEW 
# This project aims to visualze earthquake data, obtained from the US Geological Survey (USGS). It will dynamically fetch real-time earthquake data and display it on an interactive map, using circle markers, popups and a legend. There are tectonic plate overlays that can be toggled on/off for additional insight on sismic activity. 

# FEATURES
- Live earthquake data: Pulls real-time data from USGS GeoJSON API
- interactive map: ability to zoom and pan around the world, and toggle options
- size markers (Mag based): larger earthquakes appear as larger circle markers
- depth-based coloring: darker colors represent earthquakes occuring deeper within the earth
- popups - clicking a marker reveals Location, Date/time, depth, and magnitude
- Multiple basemaps: ability to toggle between Street and topographic maps

# Data Sources
1) Earthquake Data: USGS GeoJSON Feed
2) Tectonic plates: https://github.com/fraxen/tectonicplates

# How To Run

Option 1
1. Locate index.html in my project folder. Open this in your browser (Chrome preferred)
Option 2: A local Web Server (recommended)
1. Open a terminal
2. Navigate to project folder
3. Start a web server up...
- python -m http.server 8000    OR
- python -m SimpleHTTPServer 8000
4. Open in browser (http://localhost:8000)

You can also use a Live Server within VS code. 
1. Open project in Visual Studio
2. Install 'Live Server' Extension
3. right click the index.html file and select "Open With Live Server"
