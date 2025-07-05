<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# BECI Web Map - Copilot Instructions

This is a **Basin-scale Events and Coastal Impacts (BECI)** interactive web map project built with **MapLibre GL JS** and **Vite**. The project focuses on visualizing oceanographic and salmon-related data across the North Pacific region.

## Project Context

- **Purpose**: Create a professional, embeddable web map for conference presentations and funding pitches
- **Target Region**: North Pacific Ocean (Alaska, British Columbia, Japan, Kamchatka, etc.)
- **Data Focus**: Salmon populations, migration corridors, ocean temperature anomalies, monitoring stations
- **Technology Stack**: Vanilla JavaScript, MapLibre GL JS, Vite, CSS3

## Code Guidelines

When working on this project, please:

1. **Follow the established architecture**:
   - `src/main.js` - Application entry point
   - `src/modules/map.js` - Map initialization and layer management
   - `src/modules/controls.js` - UI controls and interactions
   - `src/modules/data.js` - Data generation and management
   - `src/styles/main.css` - Styling and responsive design

2. **Use oceanographic terminology** and maintain professional presentation quality

3. **Ensure responsive design** - the map should work on desktop, tablet, and mobile devices

4. **Maintain extensibility** - add TODO comments and hooks for future API integrations

5. **Follow MapLibre GL JS best practices** for performance and user experience

6. **Use modern JavaScript features** (ES6+, async/await, modules)

## Data Structure

The project uses GeoJSON format for all spatial data:
- **Salmon Populations**: Point features with density, species, and seasonal data
- **Migration Corridors**: LineString features showing movement patterns
- **Temperature Anomalies**: Polygon features with temperature deviation data
- **Monitoring Stations**: Point features with station metadata

## Future Integration Points

When adding new features, consider these extension points:
- Live API data integration (Pacific Salmon Explorer, NOAA, etc.)
- Custom basemap styling and selection
- Data dashboard integration (Chart.js, D3.js)
- Internationalization support
- Export and sharing functionality
- Time-based data filtering

## Styling Guidelines

- Use ocean-themed color palette (blues, teals, corals)
- Maintain professional, clean design suitable for scientific presentations
- Ensure accessibility (color contrast, keyboard navigation)
- Use smooth animations and transitions for better UX
