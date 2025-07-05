/**
 * Mock data generator for BECI Web Map
 * Generates realistic oceanographic and salmon data for the North Pacific
 */

export async function loadMockData() {
    console.log('📊 Loading mock data...');
    
    const data = {
        salmonPopulations: generateSalmonPopulationData(),
        migrationCorridors: generateMigrationCorridorData(),
        temperatureAnomalies: generateTemperatureAnomalyData(),
        monitoringStations: generateMonitoringStationData()
    };
    
    console.log('✅ Mock data generated successfully');
    return data;
}

/**
 * Generate salmon population density data
 */
function generateSalmonPopulationData() {
    const species = ['Chinook', 'Coho', 'Sockeye', 'Pink', 'Chum'];
    const locations = [
        { name: 'Bristol Bay', coords: [-158.5, 58.5] },
        { name: 'Prince William Sound', coords: [-147.0, 60.5] },
        { name: 'Southeast Alaska', coords: [-134.0, 57.0] },
        { name: 'British Columbia Coast', coords: [-125.0, 52.0] },
        { name: 'Washington Coast', coords: [-124.0, 47.5] },
        { name: 'Oregon Coast', coords: [-124.0, 44.0] },
        { name: 'Northern California', coords: [-124.0, 40.0] },
        { name: 'Kamchatka Peninsula', coords: [158.0, 56.0] },
        { name: 'Hokkaido', coords: [143.0, 43.0] },
        { name: 'Sakhalin Island', coords: [143.0, 51.0] }
    ];
    
    const features = locations.map(location => ({
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: location.coords
        },
        properties: {
            location: location.name,
            species: species[Math.floor(Math.random() * species.length)],
            density: Math.floor(Math.random() * 100) + 10,
            season: ['Spring', 'Summer', 'Fall', 'Winter'][Math.floor(Math.random() * 4)],
            year: 2024
        }
    }));
    
    return {
        type: 'FeatureCollection',
        features: features
    };
}

/**
 * Generate migration corridor data
 */
function generateMigrationCorridorData() {
    const corridors = [
        {
            route: 'Alaska to California',
            coords: [
                [-158.0, 58.0],
                [-150.0, 55.0],
                [-140.0, 50.0],
                [-130.0, 45.0],
                [-125.0, 40.0]
            ],
            species: 'Chinook',
            intensity: 85
        },
        {
            route: 'Japan to Alaska',
            coords: [
                [143.0, 43.0],
                [165.0, 50.0],
                [-175.0, 55.0],
                [-158.0, 58.0]
            ],
            species: 'Sockeye',
            intensity: 72
        },
        {
            route: 'Kamchatka to Alaska',
            coords: [
                [158.0, 56.0],
                [175.0, 58.0],
                [-170.0, 60.0],
                [-158.0, 58.0]
            ],
            species: 'Pink',
            intensity: 68
        },
        {
            route: 'British Columbia Coastal',
            coords: [
                [-125.0, 48.0],
                [-126.0, 50.0],
                [-128.0, 52.0],
                [-130.0, 54.0]
            ],
            species: 'Coho',
            intensity: 91
        }
    ];
    
    const features = corridors.map(corridor => ({
        type: 'Feature',
        geometry: {
            type: 'LineString',
            coordinates: corridor.coords
        },
        properties: {
            route: corridor.route,
            species: corridor.species,
            intensity: corridor.intensity,
            season: 'Spring-Fall',
            year: 2024
        }
    }));
    
    return {
        type: 'FeatureCollection',
        features: features
    };
}

/**
 * Generate temperature anomaly data
 */
function generateTemperatureAnomalyData() {
    const anomalyZones = [
        {
            name: 'Gulf of Alaska Warming',
            coords: [
                [-155.0, 56.0],
                [-145.0, 56.0],
                [-145.0, 60.0],
                [-155.0, 60.0],
                [-155.0, 56.0]
            ],
            anomaly: 2.1
        },
        {
            name: 'Bering Sea Cold Pool',
            coords: [
                [-175.0, 58.0],
                [-165.0, 58.0],
                [-165.0, 62.0],
                [-175.0, 62.0],
                [-175.0, 58.0]
            ],
            anomaly: -1.5
        },
        {
            name: 'California Current Cool',
            coords: [
                [-125.0, 35.0],
                [-120.0, 35.0],
                [-120.0, 42.0],
                [-125.0, 42.0],
                [-125.0, 35.0]
            ],
            anomaly: -0.8
        },
        {
            name: 'Kuroshio Extension Warm',
            coords: [
                [140.0, 40.0],
                [150.0, 40.0],
                [150.0, 45.0],
                [140.0, 45.0],
                [140.0, 40.0]
            ],
            anomaly: 1.7
        },
        {
            name: 'Oyashio Current Cold',
            coords: [
                [140.0, 45.0],
                [150.0, 45.0],
                [150.0, 50.0],
                [140.0, 50.0],
                [140.0, 45.0]
            ],
            anomaly: -1.2
        }
    ];
    
    const features = anomalyZones.map(zone => ({
        type: 'Feature',
        geometry: {
            type: 'Polygon',
            coordinates: [zone.coords]
        },
        properties: {
            location: zone.name,
            anomaly: zone.anomaly,
            depth: 'Surface',
            date: '2024-06-01',
            confidence: Math.floor(Math.random() * 20) + 80
        }
    }));
    
    return {
        type: 'FeatureCollection',
        features: features
    };
}

/**
 * Generate monitoring station data
 */
function generateMonitoringStationData() {
    const stations = [
        { name: 'Sitka Ocean Station', coords: [-135.3, 57.0], type: 'Oceanographic' },
        { name: 'Kodiak Research Station', coords: [-152.4, 57.8], type: 'Fisheries' },
        { name: 'Prince Rupert Buoy', coords: [-130.3, 54.3], type: 'Weather' },
        { name: 'Vancouver Island Observatory', coords: [-125.9, 49.7], type: 'Multi-sensor' },
        { name: 'Crescent City Station', coords: [-124.2, 41.7], type: 'Tsunami' },
        { name: 'Monterey Bay Research', coords: [-121.9, 36.8], type: 'Deep Sea' },
        { name: 'Hokkaido Marine Lab', coords: [143.2, 42.9], type: 'Fisheries' },
        { name: 'Kamchatka Buoy Array', coords: [158.6, 55.2], type: 'Oceanographic' },
        { name: 'Bering Sea Station', coords: [-168.9, 60.8], type: 'Climate' },
        { name: 'Aleutian Observatory', coords: [-166.5, 53.9], type: 'Seismic' }
    ];
    
    const features = stations.map(station => ({
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: station.coords
        },
        properties: {
            name: station.name,
            type: station.type,
            status: Math.random() > 0.1 ? 'Active' : 'Maintenance',
            lastUpdate: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            dataStreams: Math.floor(Math.random() * 5) + 2
        }
    }));
    
    return {
        type: 'FeatureCollection',
        features: features
    };
}

// TODO: Future data integration hooks
// - Add support for live API data ingestion
// - Implement data caching and offline support
// - Add data validation and error handling
// - Support for real-time data updates
// - Add data export functionality
// - Implement data filtering and querying capabilities

/**
 * Future API integration placeholder
 */
export async function loadLiveData() {
    // TODO: Replace with actual API calls
    const apis = {
        pacificSalmonExplorer: 'https://api.example.com/salmon-data',
        oceanObservatory: 'https://api.example.com/ocean-data',
        fishingReports: 'https://api.example.com/fishing-data',
        weatherData: 'https://api.example.com/weather-data'
    };
    
    console.log('🔄 Live data integration not yet implemented');
    console.log('Available APIs:', apis);
    
    // Return mock data for now
    return loadMockData();
}

/**
 * Data validation utilities
 */
export function validateGeoJSONData(data) {
    if (!data || typeof data !== 'object') {
        return false;
    }
    
    if (data.type !== 'FeatureCollection' || !Array.isArray(data.features)) {
        return false;
    }
    
    return data.features.every(feature => 
        feature.type === 'Feature' &&
        feature.geometry &&
        feature.properties
    );
}

/**
 * Data statistics calculator
 */
export function calculateDataStats(data) {
    const stats = {
        totalFeatures: 0,
        featureTypes: {},
        dataQuality: 100
    };
    
    Object.entries(data).forEach(([key, dataset]) => {
        if (validateGeoJSONData(dataset)) {
            stats.totalFeatures += dataset.features.length;
            stats.featureTypes[key] = dataset.features.length;
        } else {
            stats.dataQuality -= 10;
        }
    });
    
    return stats;
}
