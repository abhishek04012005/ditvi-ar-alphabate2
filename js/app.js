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

// Initialize AR Scene
document.addEventListener('DOMContentLoaded', function() {
    initARScene();
    setupMarkerDetection();
    setupEventListeners();
});

// Initialize AR.js scene
function initARScene() {
    console.log('Initializing AR Scene...');
    
    const scene = document.querySelector('a-scene');
    
    // Wait for scene to be ready
    scene.addEventListener('loaded', function() {
        console.log('AR Scene loaded successfully');
        createAllMarkers();
    });
}

// Create markers for all alphabets A-Z
function createAllMarkers() {
    const scene = document.querySelector('a-scene');
    
    ALPHABETS.forEach((letter, index) => {
        // Create marker element
        const marker = document.createElement('a-marker');
        marker.id = `marker${letter}`;
        marker.setAttribute('type', 'pattern');
        marker.setAttribute('url', `assets/markers/pattern-${letter}.patt`);
        marker.setAttribute('emitevents', 'true');
        
        // Create model entity
        const entity = document.createElement('a-entity');
        entity.id = `model${letter}`;
        entity.setAttribute('gltf-model', `url(assets/3dmodels/${letter}.gltf)`);
        entity.setAttribute('scale', '0.5 0.5 0.5');
        entity.setAttribute('position', '0 0 0');
        entity.setAttribute('rotation', '0 0 0');
        
        // Add animation attributes
        entity.setAttribute('animation-mixer', '');
        
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
    });
    
    console.log(`Created ${ALPHABETS.length} markers and models`);
}

// Setup marker detection handlers
function setupMarkerDetection() {
    console.log('Setting up marker detection...');
    console.log('Marker Type:', MARKER_CONFIG.type);
    console.log('Detection Mode:', MARKER_CONFIG.detectionMode);
}

// Setup event listeners
function setupEventListeners() {
    const scene = document.querySelector('a-scene');
    
    // Handle camera access
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then(stream => {
            console.log('Camera access granted');
            updateStatus('Camera ready - Point at markers');
        })
        .catch(err => {
            console.error('Camera access denied:', err);
            updateStatus('Camera access denied');
        });
}

// Called when marker is detected
function onMarkerFound(letter) {
    console.log(`Marker ${letter} found!`);
    updateStatus(`Detected Letter: ${letter}`);
    
    // Add visual feedback
    const model = document.getElementById(`model${letter}`);
    if (model) {
        model.setAttribute('animation', 'property: rotation; to: 0 360 0; dur: 3000; loop: true');
    }
}

// Called when marker is lost
function onMarkerLost(letter) {
    console.log(`Marker ${letter} lost`);
    
    // Remove animation
    const model = document.getElementById(`model${letter}`);
    if (model) {
        model.removeAttribute('animation');
    }
}

// Handle model click
function onModelClick(letter) {
    console.log(`Clicked on model ${letter}`);
    playSound(letter);
    showLetterInfo(letter);
}

// Play sound for letter (optional)
function playSound(letter) {
    // This can be extended to play audio files for each letter
    console.log(`Playing sound for letter: ${letter}`);
    // Example: new Audio(`assets/audio/${letter}.mp3`).play();
}

// Show letter information
function showLetterInfo(letter) {
    const infoPanel = document.getElementById('info-panel');
    const currentLetter = document.getElementById('current-letter');
    
    currentLetter.textContent = `Detected Letter: ${letter}`;
    
    // You can extend this to show more information about the letter
    console.log(`Showing info for letter: ${letter}`);
}

// Update status message
function updateStatus(message) {
    const instructions = document.getElementById('instructions');
    if (instructions) {
        instructions.textContent = message;
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

console.log('AR Alphabets A-Z Application Loaded');
