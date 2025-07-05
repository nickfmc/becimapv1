import { initializeMap } from './modules/map.js';
import { initializeControls } from './modules/controls.js';
import { loadMockData } from './modules/data.js';

/**
 * BECI Web Map - Main Application Entry Point
 * Basin-scale Events and Coastal Impacts Interactive Map
 */

class BECIMap {
    constructor() {
        this.map = null;
        this.data = null;
        this.isLoading = true;
    }

    /**
     * Initialize the application
     */
    async init() {
        try {
            console.log('🌊 Initializing BECI Web Map...');
            
            // Load mock data first
            this.data = await loadMockData();
            console.log('📊 Mock data loaded successfully');
            
            // Initialize map
            this.map = await initializeMap();
            console.log('🗺️ Map initialized successfully');
            
            // Initialize controls
            initializeControls(this.map, this.data);
            console.log('🎛️ Controls initialized successfully');
            
            // Hide loading indicator
            this.hideLoading();
            
            console.log('✅ BECI Web Map ready!');
            
        } catch (error) {
            console.error('❌ Error initializing BECI Web Map:', error);
            this.showError(error.message);
        }
    }

    /**
     * Hide loading indicator
     */
    hideLoading() {
        const loading = document.getElementById('loading');
        if (loading) {
            loading.classList.add('hidden');
            setTimeout(() => {
                loading.style.display = 'none';
            }, 300);
        }
    }

    /**
     * Show error message
     */
    showError(message) {
        const loading = document.getElementById('loading');
        if (loading) {
            loading.innerHTML = `
                <div style="text-align: center; color: #e74c3c;">
                    <h3>⚠️ Error Loading Map</h3>
                    <p>${message}</p>
                    <button onclick="location.reload()" style="
                        background: #3498db;
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 5px;
                        cursor: pointer;
                        margin-top: 10px;
                    ">Reload</button>
                </div>
            `;
        }
    }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new BECIMap();
    app.init();
});

// Export for potential future use
export { BECIMap };
