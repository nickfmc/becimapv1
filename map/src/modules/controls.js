import { addDataLayers, toggleLayer } from './map.js';

/**
 * Controls initialization and event handling
 * Manages layer toggles and user interactions
 */

export function initializeControls(map, data) {
    console.log('🎛️ Initializing map controls...');
    
    // Add data layers to map
    addDataLayers(map, data);
    
    // Initialize layer toggles
    initializeLayerToggles(map);
    
    // Initialize responsive controls
    initializeResponsiveControls();
    
    // Add keyboard shortcuts
    initializeKeyboardShortcuts(map);
    
    console.log('✅ Controls initialized successfully');
}

/**
 * Initialize layer toggle controls
 */
function initializeLayerToggles(map) {
    const layerControls = {
        'salmon-populations': document.getElementById('salmon-populations'),
        'migration-corridors': document.getElementById('migration-corridors'),
        'temperature-anomalies': document.getElementById('temperature-anomalies'),
        'monitoring-stations': document.getElementById('monitoring-stations')
    };
    
    Object.entries(layerControls).forEach(([layerId, control]) => {
        if (control) {
            control.addEventListener('change', (e) => {
                const visible = e.target.checked;
                toggleLayer(map, layerId, visible);
                
                // Add animation effect
                const layerControl = e.target.closest('.layer-control');
                if (layerControl) {
                    layerControl.classList.add('slide-in');
                    setTimeout(() => {
                        layerControl.classList.remove('slide-in');
                    }, 300);
                }
                
                console.log(`🔄 Layer ${layerId} ${visible ? 'enabled' : 'disabled'}`);
            });
        }
    });
}

/**
 * Initialize responsive controls for mobile devices
 */
function initializeResponsiveControls() {
    const sidebar = document.querySelector('.controls-sidebar');
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Add mobile toggle button
        const toggleButton = document.createElement('button');
        toggleButton.innerHTML = '🎛️';
        toggleButton.className = 'mobile-toggle';
        toggleButton.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            z-index: 1000;
            background: #3498db;
            color: white;
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            font-size: 20px;
            cursor: pointer;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        `;
        
        document.body.appendChild(toggleButton);
        
        toggleButton.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
        
        // Close sidebar when clicking outside
        document.addEventListener('click', (e) => {
            if (!sidebar.contains(e.target) && !toggleButton.contains(e.target)) {
                sidebar.classList.remove('open');
            }
        });
    }
}

/**
 * Initialize keyboard shortcuts
 */
function initializeKeyboardShortcuts(map) {
    document.addEventListener('keydown', (e) => {
        // Only handle shortcuts when not in an input field
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }
        
        switch (e.key) {
            case '1':
                toggleLayerByKey('salmon-populations');
                break;
            case '2':
                toggleLayerByKey('migration-corridors');
                break;
            case '3':
                toggleLayerByKey('temperature-anomalies');
                break;
            case '4':
                toggleLayerByKey('monitoring-stations');
                break;
            case 'h':
                showKeyboardShortcuts();
                break;
            case 'Escape':
                hideAllPopups(map);
                break;
        }
    });
}

/**
 * Toggle layer by keyboard shortcut
 */
function toggleLayerByKey(layerId) {
    const control = document.getElementById(layerId);
    if (control) {
        control.checked = !control.checked;
        control.dispatchEvent(new Event('change'));
    }
}

/**
 * Show keyboard shortcuts help
 */
function showKeyboardShortcuts() {
    const popup = document.createElement('div');
    popup.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        max-width: 400px;
    `;
    
    popup.innerHTML = `
        <h3>⌨️ Keyboard Shortcuts</h3>
        <p><strong>1-4:</strong> Toggle data layers</p>
        <p><strong>H:</strong> Show this help</p>
        <p><strong>Esc:</strong> Close popups</p>
        <button onclick="this.parentElement.remove()" style="
            background: #3498db;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 10px;
        ">Close</button>
    `;
    
    document.body.appendChild(popup);
    
    // Auto-close after 5 seconds
    setTimeout(() => {
        if (popup.parentElement) {
            popup.remove();
        }
    }, 5000);
}

/**
 * Hide all open popups
 */
function hideAllPopups(map) {
    const popups = document.querySelectorAll('.maplibregl-popup');
    popups.forEach(popup => popup.remove());
}

/**
 * Add animation effects to controls
 */
export function addControlAnimation(element, type = 'fade-in') {
    element.classList.add(type);
    setTimeout(() => {
        element.classList.remove(type);
    }, 500);
}

/**
 * Update layer control state
 */
export function updateLayerControl(layerId, visible) {
    const control = document.getElementById(layerId);
    if (control) {
        control.checked = visible;
    }
}

/**
 * Get current layer visibility states
 */
export function getLayerStates() {
    const layerIds = ['salmon-populations', 'migration-corridors', 'temperature-anomalies', 'monitoring-stations'];
    const states = {};
    
    layerIds.forEach(layerId => {
        const control = document.getElementById(layerId);
        if (control) {
            states[layerId] = control.checked;
        }
    });
    
    return states;
}

/**
 * Set layer visibility states
 */
export function setLayerStates(map, states) {
    Object.entries(states).forEach(([layerId, visible]) => {
        toggleLayer(map, layerId, visible);
        updateLayerControl(layerId, visible);
    });
}

// TODO: Future extensibility hooks
// - Add support for custom control panels
// - Implement layer opacity controls
// - Add time-based layer filtering
// - Support for custom basemap selection
// - Add export/sharing functionality
