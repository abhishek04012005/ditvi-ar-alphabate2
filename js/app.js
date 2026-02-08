// AR Alphabets A-Z - Main Application
// Uses AR.js with A-Frame for web-based augmented reality

const ALPHABETS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
                    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

// Marker configuration
const MARKER_CONFIG = {
    type: 'Pattern-based Markers',
    format: '.patt files',
    description: 'Uses NFT (Natural Feature Tracking) compatible pattern markers',
    detectionMode: 'MONO',
    matrixCodeType: '3x3'
};

let loadingProgress = 0;
let assetsToLoad = 0;
let assetsLoaded = 0;

// Initialize AR Scene
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Starting AR initialization...');
    updateLoadingStatus('Requesting camera access...');
    
    initARScene();
    requestCameraAccess();
    setupEventListeners();
});

// Request Camera Access
function requestCameraAccess() {
    console.log('Requesting camera access...');
    
    const constraints = {
        video: {
            facingMode: 'environment',
            width: { ideal: 1280 },
            height: { ideal: 720 }
        },
        audio: false
    };
    
    navigator.mediaDevices.getUserMedia(constraints)
        .then(stream => {
            console.log('✓ Camera access granted');
            updateLoadingStatus('Camera ready. Loading assets...');
            // Stop the stream as AR.js will handle it
            stream.getTracks().forEach(track => track.stop());
            updateLoadingProgress(30);
        })
        .catch(err => {
            console.error('✗ Camera access error:', err);
            showError('Camera Error: ' + err.message + '. Please check permissions and try again.');
            showErrorOverlay(true);
        });
}

// Initialize AR.js scene
function initARScene() {
    console.log('Initializing AR Scene...');
    
    const scene = document.querySelector('a-scene');
    
    if (!scene) {
        console.error('AR Scene not found!');
        showError('AR Scene initialization failed');
        showErrorOverlay(true);
        return;
    }
    
    // Wait for scene to be ready
    scene.addEventListener('loaded', function() {
        console.log('✓ AR Scene loaded successfully');
        updateLoadingStatus('Scene loaded. Initializing markers...');
        updateLoadingProgress(60);
        createAllMarkers();
    });
    
    // Handle scene errors
    scene.addEventListener('error', function(e) {
        console.error('Scene error:', e);
        showError('Scene Error: ' + e.detail.error);
    });
}

// Create markers for all alphabets A-Z
function createAllMarkers() {
    const scene = document.querySelector('a-scene');
    
    console.log('Creating markers for all alphabets...');
    updateLoadingStatus('Setting up marker detection...');
    
    ALPHABETS.forEach((letter, index) => {
        // Check if marker already exists
        const existingMarker = document.getElementById(`marker${letter}`);
        if (existingMarker) {
            console.log(`Marker ${letter} already exists`);
            return;
        }
        
        // Create marker element
        const marker = document.createElement('a-marker');
        marker.id = `marker${letter}`;
        marker.setAttribute('type', 'pattern');
        marker.setAttribute('url', `assets/markers/pattern-${letter}.patt`);
        marker.setAttribute('emitevents', 'true');
        
        // Create model entity
        const entity = document.createElement('a-entity');
        entity.id = `model${letter}`;
        entity.setAttribute('gltf-model', `url(assets/3dmodels/${letter}.glb)`);
        entity.setAttribute('scale', '0.5 0.5 0.5');
        entity.setAttribute('position', '0 0 0');
        entity.setAttribute('rotation', '0 0 0');
        
        // Add animation attributes
        entity.setAttribute('animation-mixer', '');
        entity.setAttribute('animation', 'property: rotation; to: 0 360 0; dur: 6000; loop: true');
        
        // Add click handler
        entity.addEventListener('click', function() {
            onModelClick(letter);
        });
        
        marker.appendChild(entity);
        scene.appendChild(marker);
        
        // Add marker detected/lost events
        marker.addEventListener('markerFound', function() {
            onMarkerFound(letter);
        });
        
        marker.addEventListener('markerLost', function() {
            onMarkerLost(letter);
        });
        
        // Track model loading
        entity.addEventListener('model-loaded', function() {
            onModelLoaded(letter);
        });
        
        entity.addEventListener('model-error', function() {
            console.warn(`Model ${letter} failed to load`);
        });
    });
    
    console.log(`Created ${ALPHABETS.length} markers and models`);
    updateLoadingStatus('Assets loading...');
}

// Called when model is loaded
function onModelLoaded(letter) {
    assetsLoaded++;
    const progress = 60 + (assetsLoaded / assetsToLoad) * 40;
    updateLoadingProgress(Math.min(progress, 99));
    console.log(`Model ${letter} loaded (${assetsLoaded}/${assetsToLoad})`);
}

// Setup event listeners
function setupEventListeners() {
    const scene = document.querySelector('a-scene');
    
    if (scene) {
        scene.addEventListener('renderstart', function() {
            console.log('✓ AR rendering started');
            updateLoadingStatus('Finalizing setup...');
            updateLoadingProgress(95);
            
            // Small delay to ensure everything is ready
            setTimeout(() => {
                hideLoader();
                updateStatus('Ready - Point camera at markers');
            }, 500);
        });
    }
}

// Called when marker is detected
function onMarkerFound(letter) {
    console.log(`✓ Marker ${letter} detected!`);
    updateStatus(`Detected Letter: ${letter}`);
    
    // Add visual feedback
    const model = document.getElementById(`model${letter}`);
    if (model) {
        console.log(`Showing model for letter ${letter}`);
    }
}

// Called when marker is lost
function onMarkerLost(letter) {
    console.log(`✗ Marker ${letter} lost`);
}

// Handle model click
function onModelClick(letter) {
    console.log(`Clicked on model ${letter}`);
    playSound(letter);
    showLetterInfo(letter);
}

// Play sound for letter (optional)
function playSound(letter) {
    console.log(`Playing sound for letter: ${letter}`);
}

// Show letter information
function showLetterInfo(letter) {
    const currentLetter = document.getElementById('current-letter');
    if (currentLetter) {
        currentLetter.textContent = `Detected Letter: ${letter}`;
    }
    console.log(`Showing info for letter: ${letter}`);
}

// Update status message
function updateStatus(message) {
    const instructions = document.getElementById('instructions');
    if (instructions) {
        instructions.textContent = message;
    }
    console.log(`Status: ${message}`);
}

// Update loading status
function updateLoadingStatus(message) {
    const statusEl = document.getElementById('loading-status');
    if (statusEl) {
        statusEl.textContent = message;
    }
    console.log(`Loading: ${message}`);
}

// Update loading progress
function updateLoadingProgress(percent) {
    const progressBar = document.getElementById('loading-progress');
    if (progressBar) {
        progressBar.style.width = Math.min(percent, 100) + '%';
    }
}

// Hide loader
function hideLoader() {
    const loader = document.getElementById('loading-overlay');
    if (loader) {
        loader.classList.remove('active');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
    console.log('Loader hidden');
}

// Show loader
function showLoader() {
    const loader = document.getElementById('loading-overlay');
    if (loader) {
        loader.style.display = 'flex';
        loader.classList.add('active');
    }
}

// Show error overlay
function showErrorOverlay(show) {
    const errorOverlay = document.getElementById('error-overlay');
    if (errorOverlay) {
        if (show) {
            errorOverlay.style.display = 'flex';
            hideLoader();
        } else {
            errorOverlay.style.display = 'none';
        }
    }
}

// Show error message
function showError(message) {
    console.error('ERROR:', message);
    const errorMessage = document.getElementById('error-message');
    if (errorMessage) {
        errorMessage.textContent = message;
    }
}

// Function to reset scene
function resetScene() {
    console.log('Resetting AR scene...');
    const models = document.querySelectorAll('[id^="model"]');
    models.forEach(model => {
        model.removeAttribute('animation');
    });
    updateStatus('Scene reset - Point camera at markers');
}

// Export functions for use in HTML
window.resetScene = resetScene;
window.MARKER_CONFIG = MARKER_CONFIG;
window.ALPHABETS = ALPHABETS;

console.log('AR Alphabets A-Z Application Initialized');

