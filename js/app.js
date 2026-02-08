// AR Alphabets Application - Main JavaScript File

// Configuration
const CONFIG = {
    markers: {
        A: { name: 'Apple', url: 'assets/markers/pattern-apple.patt' },
        B: { name: 'Ball', url: 'assets/markers/pattern-ball.patt' },
        C: { name: 'Cat', url: 'assets/markers/pattern-cat.patt' },
        D: { name: 'Dog', url: 'assets/markers/pattern-dog.patt' },
        E: { name: 'Elephant', url: 'assets/markers/pattern-elephant.patt' },
        F: { name: 'Fish', url: 'assets/markers/pattern-fish.patt' },
        G: { name: 'Giraffe', url: 'assets/markers/pattern-giraffe.patt' },
        H: { name: 'House', url: 'assets/markers/pattern-house.patt' },
        I: { name: 'Ice Cream', url: 'assets/markers/pattern-ice-cream.patt' },
        J: { name: 'Jeep', url: 'assets/markers/pattern-jeep.patt' },
        K: { name: 'Kite', url: 'assets/markers/pattern-kite.patt' },
        L: { name: 'Lion', url: 'assets/markers/pattern-lion.patt' },
        M: { name: 'Monkey', url: 'assets/markers/pattern-monkey.patt' },
        N: { name: 'Nest', url: 'assets/markers/pattern-nest.patt' },
        O: { name: 'Orange', url: 'assets/markers/pattern-orange.patt' },
        P: { name: 'Penguin', url: 'assets/markers/pattern-penguin.patt' },
        Q: { name: 'Quack', url: 'assets/markers/pattern-quack.patt' },
        R: { name: 'Rose', url: 'assets/markers/pattern-rose.patt' },
        S: { name: 'Snowman', url: 'assets/markers/pattern-snowman.patt' },
        T: { name: 'Tiger', url: 'assets/markers/pattern-tiger.patt' },
        U: { name: 'Umbrella', url: 'assets/markers/pattern-umbrella.patt' },
        V: { name: 'Violin', url: 'assets/markers/pattern-violin.patt' },
        W: { name: 'Whale', url: 'assets/markers/pattern-whale.patt' },
        X: { name: 'Xmas', url: 'assets/markers/pattern-xmas.patt' },
        Y: { name: 'Yacht', url: 'assets/markers/pattern-yacht.patt' },
        Z: { name: 'Zebra', url: 'assets/markers/pattern-zebra.patt' }
    }
};

// State Management
const STATE = {
    currentLetter: null,
    markerDetected: false,
    audioEnabled: true,
    gesturesEnabled: true
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('AR Alphabets Application - Initializing...');
    initializeApplication();
});

// Application Initialization
function initializeApplication() {
    console.log('✓ Application initialized');
    setupMarkerDetection();
    setupEventListeners();
    initializeAudioVisuals();
}

// Setup Marker Detection
function setupMarkerDetection() {
    const scene = document.querySelector('a-scene');
    
    if (!scene) {
        console.error('❌ A-Scene element not found');
        return;
    }

    // Monitor all markers
    const markers = document.querySelectorAll('a-marker');
    
    markers.forEach((marker, index) => {
        marker.addEventListener('markerFound', () => {
            const markerId = marker.id;
            const letter = markerId.replace('-marker', '').toUpperCase();
            onMarkerFound(letter, marker);
        });

        marker.addEventListener('markerLost', () => {
            const markerId = marker.id;
            const letter = markerId.replace('-marker', '').toUpperCase();
            onMarkerLost(letter, marker);
        });
    });

    console.log(`✓ Tracking ${markers.length} markers`);
}

// Handle Marker Found
function onMarkerFound(letter, marker) {
    STATE.currentLetter = letter;
    STATE.markerDetected = true;

    console.log(`📍 Marker Found: ${letter} - ${CONFIG.markers[letter].name}`);

    // Update UI
    updateLetterDisplay(letter);
    
    // Play sound if enabled
    if (STATE.audioEnabled) {
        const sound = marker.querySelector('a-sound');
        if (sound && sound.components.sound) {
            sound.components.sound.playSound();
        }
    }

    // Show gesture hints
    showGestureHints();
}

// Handle Marker Lost
function onMarkerLost(letter, marker) {
    if (STATE.currentLetter === letter) {
        STATE.currentLetter = null;
        STATE.markerDetected = false;
    }

    console.log(`📍 Marker Lost: ${letter}`);

    // Update UI
    updateLetterDisplay(null);

    // Hide gesture hints
    hideGestureHints();
}

// Update Letter Display
function updateLetterDisplay(letter) {
    const infoPanelElement = document.querySelector('#current-letter');
    if (infoPanelElement) {
        if (letter) {
            const letterName = CONFIG.markers[letter].name;
            infoPanelElement.textContent = `Detected: ${letter} - ${letterName}`;
            infoPanelElement.style.color = '#4CAF50';
        } else {
            infoPanelElement.textContent = 'Detected Letter: None';
            infoPanelElement.style.color = '#b0b0b0';
        }
    }
}

// Setup Event Listeners
function setupEventListeners() {
    // Audio toggle
    document.addEventListener('keydown', (event) => {
        if (event.key === 'a' || event.key === 'A') {
            STATE.audioEnabled = !STATE.audioEnabled;
            console.log(`🔊 Audio: ${STATE.audioEnabled ? 'ON' : 'OFF'}`);
        }
        
        if (event.key === 'g' || event.key === 'G') {
            STATE.gesturesEnabled = !STATE.gesturesEnabled;
            console.log(`👆 Gestures: ${STATE.gesturesEnabled ? 'ON' : 'OFF'}`);
        }
    });

    // Window resize handling
    window.addEventListener('resize', () => {
        adjustCanvasSize();
    });

    // Orientation change
    window.addEventListener('orientationchange', () => {
        adjustCanvasSize();
    });
}

// Initialize Audio Visuals
function initializeAudioVisuals() {
    console.log('🎵 Audio system initialized');
    // Future audio visualization features can be added here
}

// Show Gesture Hints
function showGestureHints() {
    if (STATE.gesturesEnabled) {
        const gestureHint = document.querySelector('.gesture-hint');
        if (!gestureHint) {
            const hint = document.createElement('div');
            hint.className = 'gesture-hint active';
            hint.textContent = '👆 Pinch to zoom | Drag to rotate';
            document.body.appendChild(hint);

            // Auto-hide after 3 seconds
            setTimeout(() => {
                if (hint.parentNode) {
                    hint.remove();
                }
            }, 3000);
        }
    }
}

// Hide Gesture Hints
function hideGestureHints() {
    const gestureHints = document.querySelectorAll('.gesture-hint');
    gestureHints.forEach(hint => hint.remove());
}

// Adjust Canvas Size
function adjustCanvasSize() {
    const canvas = document.querySelector('canvas');
    if (canvas) {
        canvas.style.width = window.innerWidth + 'px';
        canvas.style.height = window.innerHeight + 'px';
        console.log(`📐 Canvas resized to ${window.innerWidth}x${window.innerHeight}`);
    }
}

// Request Camera Access
function requestCameraAccess() {
    const constraints = {
        video: {
            facingMode: { ideal: 'environment' },
            width: { ideal: 1280 },
            height: { ideal: 720 },
            aspectRatio: { ideal: 16 / 9 }
        },
        audio: false
    };

    navigator.mediaDevices.getUserMedia(constraints)
        .then(stream => {
            console.log('✓ Camera access granted');
            stream.getTracks().forEach(track => track.stop());
        })
        .catch(err => {
            console.error('❌ Camera Error:', err.name, '-', err.message);
            console.log('Camera Settings Used:', constraints);
        });
}

// Export functions for global access
window.AR = {
    toggleAudio: () => {
        STATE.audioEnabled = !STATE.audioEnabled;
        console.log(`🔊 Audio: ${STATE.audioEnabled ? 'ON' : 'OFF'}`);
    },
    toggleGestures: () => {
        STATE.gesturesEnabled = !STATE.gesturesEnabled;
        console.log(`👆 Gestures: ${STATE.gesturesEnabled ? 'ON' : 'OFF'}`);
    },
    getCurrentLetter: () => STATE.currentLetter,
    getState: () => ({ ...STATE }),
    getConfig: () => CONFIG
};

// Log initialization complete
console.log('✅ AR Alphabets Application Ready');
console.log('Press A to toggle audio');
console.log('Press G to toggle gestures');
console.log('Type AR.toggleAudio() or AR.toggleGestures() in console to control');

// Request camera access on load
window.addEventListener('load', () => {
    requestCameraAccess();
});
