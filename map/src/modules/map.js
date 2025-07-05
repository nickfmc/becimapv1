import maplibregl from 'maplibre-gl';

/**
 * Map initialization and configuration
 * Focused on North Pacific region for oceanographic and salmon data
 */

export async function initializeMap() {
    console.log('🗺️ Initializing MapLibre GL map...');
    
    // North Pacific focused bounds
    const NORTH_PACIFIC_BOUNDS = [
        [-180, 35], // Southwest coordinates
        [-100, 70]  // Northeast coordinates
    ];
    
    // Create map instance
    const map = new maplibregl.Map({
        container: 'map',
        style: {
            version: 8,
            sources: {
                'osm': {
                    type: 'raster',
                    tiles: [
                        'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
                    ],
                    tileSize: 256,
                    attribution: '© OpenStreetMap contributors'
                }
            },
            layers: [
                {
                    id: 'osm',
                    type: 'raster',
                    source: 'osm'
                }
            ]
        },
        center: [-140, 55], // Center on North Pacific
        zoom: 4,
        maxBounds: NORTH_PACIFIC_BOUNDS,
        minZoom: 3,
        maxZoom: 12
    });

    // Add navigation controls
    map.addControl(new maplibregl.NavigationControl(), 'top-left');
    
    // Add scale control
    map.addControl(new maplibregl.ScaleControl(), 'bottom-left');
    
    // Add fullscreen control
    map.addControl(new maplibregl.FullscreenControl(), 'top-right');

    return new Promise((resolve, reject) => {
        map.on('load', () => {
            console.log('✅ Map loaded successfully');
            
            // Add custom ocean styling
            addOceanStyling(map);
            
            resolve(map);
        });
        
        map.on('error', (error) => {
            console.error('❌ Map loading error:', error);
            reject(error);
        });
    });
}

/**
 * Add custom ocean-themed styling
 */
function addOceanStyling(map) {
    // Add ocean background
    map.addSource('ocean-background', {
        type: 'geojson',
        data: {
            type: 'Feature',
            geometry: {
                type: 'Polygon',
                coordinates: [[
                    [-180, -90],
                    [180, -90],
                    [180, 90],
                    [-180, 90],
                    [-180, -90]
                ]]
            }
        }
    });
    
    map.addLayer({
        id: 'ocean-background',
        type: 'fill',
        source: 'ocean-background',
        paint: {
            'fill-color': '#1e3a8a',
            'fill-opacity': 0.1
        }
    }, 'osm');
}

/**
 * Add data layers to the map
 */
export function addDataLayers(map, data) {
    // Add salmon population data
    if (data.salmonPopulations) {
        addSalmonPopulationLayer(map, data.salmonPopulations);
    }
    
    // Add migration corridors
    if (data.migrationCorridors) {
        addMigrationCorridorLayer(map, data.migrationCorridors);
    }
    
    // Add temperature anomalies
    if (data.temperatureAnomalies) {
        addTemperatureAnomalyLayer(map, data.temperatureAnomalies);
    }
    
    // Add monitoring stations
    if (data.monitoringStations) {
        addMonitoringStationLayer(map, data.monitoringStations);
    }
}

/**
 * Add salmon population density layer
 */
function addSalmonPopulationLayer(map, data) {
    map.addSource('salmon-populations', {
        type: 'geojson',
        data: data
    });
    
    map.addLayer({
        id: 'salmon-populations',
        type: 'circle',
        source: 'salmon-populations',
        paint: {
            'circle-radius': [
                'interpolate',
                ['linear'],
                ['get', 'density'],
                0, 5,
                100, 20
            ],
            'circle-color': [
                'interpolate',
                ['linear'],
                ['get', 'density'],
                0, '#ffe6e6',
                50, '#ff9999',
                100, '#ff3333'
            ],
            'circle-opacity': 0.8,
            'circle-stroke-width': 2,
            'circle-stroke-color': '#cc0000'
        }
    });
    
    // Add click handler for popups
    map.on('click', 'salmon-populations', (e) => {
        const properties = e.features[0].properties;
        const coordinates = e.features[0].geometry.coordinates.slice();
        
        new maplibregl.Popup()
            .setLngLat(coordinates)
            .setHTML(`
                <h3>🐟 Salmon Population</h3>
                <p><strong>Location:</strong> ${properties.location || 'Unknown'}</p>
                <p><strong>Species:</strong> ${properties.species || 'Mixed'}</p>
                <p><strong>Density:</strong> <span class="data-value">${properties.density || 0} fish/km²</span></p>
                <p><strong>Season:</strong> ${properties.season || 'Year-round'}</p>
            `)
            .addTo(map);
    });
    
    // Change cursor on hover
    map.on('mouseenter', 'salmon-populations', () => {
        map.getCanvas().style.cursor = 'pointer';
    });
    
    map.on('mouseleave', 'salmon-populations', () => {
        map.getCanvas().style.cursor = '';
    });
}

/**
 * Add migration corridor layer
 */
function addMigrationCorridorLayer(map, data) {
    map.addSource('migration-corridors', {
        type: 'geojson',
        data: data
    });
    
    map.addLayer({
        id: 'migration-corridors',
        type: 'line',
        source: 'migration-corridors',
        paint: {
            'line-color': '#4ecdc4',
            'line-width': [
                'interpolate',
                ['linear'],
                ['get', 'intensity'],
                0, 2,
                100, 8
            ],
            'line-opacity': 0.8
        }
    });
    
    // Add click handler
    map.on('click', 'migration-corridors', (e) => {
        const properties = e.features[0].properties;
        
        new maplibregl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(`
                <h3>🚀 Migration Corridor</h3>
                <p><strong>Route:</strong> ${properties.route || 'Unknown'}</p>
                <p><strong>Species:</strong> ${properties.species || 'Mixed'}</p>
                <p><strong>Intensity:</strong> <span class="data-value">${properties.intensity || 0}%</span></p>
                <p><strong>Season:</strong> ${properties.season || 'Seasonal'}</p>
            `)
            .addTo(map);
    });
}

/**
 * Add temperature anomaly layer
 */
function addTemperatureAnomalyLayer(map, data) {
    map.addSource('temperature-anomalies', {
        type: 'geojson',
        data: data
    });
    
    map.addLayer({
        id: 'temperature-anomalies',
        type: 'fill',
        source: 'temperature-anomalies',
        paint: {
            'fill-color': [
                'interpolate',
                ['linear'],
                ['get', 'anomaly'],
                -3, '#0066cc',
                -1, '#66b3ff',
                0, '#ffffff',
                1, '#ff9999',
                3, '#cc0000'
            ],
            'fill-opacity': 0.6
        }
    });
    
    // Add click handler
    map.on('click', 'temperature-anomalies', (e) => {
        const properties = e.features[0].properties;
        
        new maplibregl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(`
                <h3>🌡️ Temperature Anomaly</h3>
                <p><strong>Location:</strong> ${properties.location || 'Unknown'}</p>
                <p><strong>Anomaly:</strong> <span class="data-value">${properties.anomaly || 0}°C</span></p>
                <p><strong>Depth:</strong> ${properties.depth || 'Surface'}</p>
                <p><strong>Date:</strong> ${properties.date || 'Recent'}</p>
            `)
            .addTo(map);
    });
}

/**
 * Add monitoring station layer
 */
function addMonitoringStationLayer(map, data) {
    map.addSource('monitoring-stations', {
        type: 'geojson',
        data: data
    });
    
    map.addLayer({
        id: 'monitoring-stations',
        type: 'circle',
        source: 'monitoring-stations',
        paint: {
            'circle-radius': 8,
            'circle-color': '#f39c12',
            'circle-stroke-width': 2,
            'circle-stroke-color': '#ffffff'
        }
    });
    
    // Add click handler
    map.on('click', 'monitoring-stations', (e) => {
        const properties = e.features[0].properties;
        
        new maplibregl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(`
                <h3>📡 Monitoring Station</h3>
                <p><strong>Station:</strong> ${properties.name || 'Unknown'}</p>
                <p><strong>Type:</strong> ${properties.type || 'Multi-sensor'}</p>
                <p><strong>Status:</strong> <span class="data-value">${properties.status || 'Active'}</span></p>
                <p><strong>Last Update:</strong> ${properties.lastUpdate || 'Recent'}</p>
            `)
            .addTo(map);
    });
}

/**
 * Toggle layer visibility
 */
export function toggleLayer(map, layerId, visible) {
    const visibility = visible ? 'visible' : 'none';
    if (map.getLayer(layerId)) {
        map.setLayoutProperty(layerId, 'visibility', visibility);
    }
}
