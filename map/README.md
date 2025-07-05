# BECI Web Map

> **Basin-scale Events and Coastal Impacts** - Interactive Web Map for Oceanographic and Salmon Data

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Built with Vite](https://img.shields.io/badge/Built%20with-Vite-646CFF.svg)](https://vitejs.dev/)
[![MapLibre GL JS](https://img.shields.io/badge/Maps-MapLibre%20GL%20JS-blue.svg)](https://maplibre.org/)

## 🌊 Overview

A modern, interactive web map designed for the Basin-scale Events and Coastal Impacts (BECI) project. This application visualizes oceanographic and salmon-related data across the North Pacific region, providing a professional platform for scientific presentations and funding pitches.

### Key Features

- **🗺️ Interactive Mapping**: Built with MapLibre GL JS for smooth, responsive mapping
- **📊 Multi-layer Visualization**: Toggle between salmon populations, migration corridors, temperature anomalies, and monitoring stations
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **🎨 Professional Styling**: Ocean-themed design suitable for scientific presentations
- **🔧 Extensible Architecture**: Modular codebase ready for future API integrations

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Modern web browser with WebGL support

### Installation

```bash
# Clone the repository
git clone https://github.com/beci-project/web-map.git
cd web-map

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── main.js                 # Application entry point
├── modules/
│   ├── map.js             # Map initialization and layers
│   ├── controls.js        # UI controls and interactions
│   └── data.js            # Data generation and management
└── styles/
    └── main.css           # Styling and responsive design
```

## 🎯 Data Layers

### 1. Salmon Population Densities
- **Type**: Point features
- **Data**: Species, density, seasonal patterns
- **Visualization**: Graduated circles with color coding

### 2. Migration Corridors
- **Type**: LineString features
- **Data**: Route names, species, intensity
- **Visualization**: Colored lines with variable width

### 3. Temperature Anomalies
- **Type**: Polygon features
- **Data**: Temperature deviation, depth, confidence
- **Visualization**: Color-coded polygons (-3°C to +3°C)

### 4. Monitoring Stations
- **Type**: Point features
- **Data**: Station names, types, status
- **Visualization**: Standardized symbols with status indicators

## 🎮 User Interface

### Layer Controls
- **Toggle Switches**: Enable/disable individual layers
- **Legend**: Visual guide to data representation
- **Responsive Sidebar**: Collapsible on mobile devices

### Map Interactions
- **Popups**: Click features for detailed information
- **Hover Effects**: Visual feedback on interactive elements
- **Keyboard Shortcuts**: 
  - `1-4`: Toggle layers
  - `H`: Show help
  - `Esc`: Close popups

## 🔧 Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Code Style

- **ES6+ JavaScript**: Modern syntax with modules
- **Async/Await**: For asynchronous operations
- **MapLibre GL JS**: For mapping functionality
- **CSS3**: Modern styling with flexbox and grid

### Adding New Features

1. **Data Layers**: Add new datasets in `src/modules/data.js`
2. **Map Styling**: Modify layer styling in `src/modules/map.js`
3. **UI Controls**: Add interactions in `src/modules/controls.js`
4. **Styling**: Update appearance in `src/styles/main.css`

## 🌐 Deployment

### Static Hosting
The built application is a static site that can be deployed to:
- GitHub Pages
- Netlify
- Vercel
- AWS S3 + CloudFront

### Embedding
To embed the map in other websites:

```html
<div class="embed-container">
    <iframe src="https://your-domain.com/beci-map" 
            width="100%" 
            height="600" 
            frameborder="0">
    </iframe>
</div>
```

## 🔮 Future Enhancements

### Planned Features
- [ ] **Live Data Integration**: Connect to real-time APIs
- [ ] **Custom Basemaps**: Multiple map style options
- [ ] **Data Dashboard**: Charts and analytics integration
- [ ] **Export Functionality**: Download maps and data
- [ ] **Internationalization**: Multi-language support
- [ ] **Time Controls**: Historical data visualization

### API Integration Points
- Pacific Salmon Explorer
- NOAA Ocean Data
- Marine Weather Services
- Fisheries Research Databases

## 📊 Data Sources

*Note: Currently using mock data for demonstration purposes*

### Planned Data Sources
- **Pacific Salmon Foundation**: Population data
- **NOAA**: Ocean temperature and weather data
- **DFO Canada**: Fisheries monitoring data
- **PICES**: North Pacific research data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**BECI Project Team**
- Website: [https://beci.info/](https://beci.info/)
- Email: info@beci.info

---

*Built with ❤️ for marine science and salmon conservation*
