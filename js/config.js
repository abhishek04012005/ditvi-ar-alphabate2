// AR Application Configuration
// Easily customize the AR experience

const ARConfig = {
    // Application Settings
    app: {
        name: 'AR Alphabets A-Z',
        version: '1.0.0',
        description: 'Web-based AR application for learning alphabets'
    },
    
    // Camera Configuration
    camera: {
        type: 'environment',  // 'user' for front camera, 'environment' for back
        width: 1280,
        height: 720,
        facingMode: 'environment'
    },
    
    // AR.js Configuration
    arjs: {
        sourceType: 'webcam',
        detectionMode: 'mono',      // 'mono' or 'color'
        matrixCodeType: '3x3',
        debugUIEnabled: false,
        trackingMethod: 'best',
        patternRatio: 0.8
    },
    
    // 3D Model Configuration
    models: {
        scale: {
            x: 0.5,
            y: 0.5,
            z: 0.5
        },
        position: {
            x: 0,
            y: 0,
            z: 0
        },
        rotation: {
            x: 0,
            y: 0,
            z: 0
        },
        defaultFormat: 'gltf',  // 'gltf' or 'glb'
        animationEnabled: true
    },
    
    // Marker Configuration
    markers: {
        type: 'pattern',           // 'pattern', 'barcode', or 'nft'
        format: '.patt',
        size: 256,                 // Recommended size in pixels
        borderRatio: 0.25,
        errorCorrection: 'H'       // For QR: 'L', 'M', 'Q', 'H'
    },
    
    // UI Configuration
    ui: {
        showDebugInfo: false,
        showFPS: false,
        showCameraInfo: true,
        infoPanelVisible: true,
        controlsVisible: true
    },
    
    // Alphabets Configuration
    alphabets: {
        list: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
               'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
        assetsPath: 'assets/',
        modelsPath: 'assets/3dmodels/',
        markersPath: 'assets/markers/'
    },
    
    // Animation Configuration
    animations: {
        markerFoundDuration: 500,   // ms
        modelRotationDuration: 3000, // ms
        enableAutoRotate: true,
        rotationAxis: 'y'
    },
    
    // Audio Configuration
    audio: {
        enabled: false,
        soundPath: 'assets/audio/',
        pronunciationFormat: '.mp3',
        volume: 0.7
    },
    
    // Performance Configuration
    performance: {
        targetFPS: 60,
        enableCulling: true,
        enableLOD: false,
        textureCompression: true
    },
    
    // Detection Sensitivity
    detection: {
        minConfidence: 0.5,
        maxProcessingTime: 50,      // ms per frame
        enableSmoothing: true,
        smoothingFactor: 0.7
    },
    
    // Environment
    environment: {
        lightIntensity: 1.0,
        lightColor: '#ffffff',
        backgroundColor: '#000000',
        fogEnabled: false,
        fogColor: '#000000',
        fogNear: 0.1,
        fogFar: 100
    },
    
    // Getters for easy access
    getModelPath: function(letter) {
        return this.alphabets.modelsPath + letter + '.' + this.markers.format;
    },
    
    getMarkerPath: function(letter) {
        return this.alphabets.markersPath + 'pattern-' + letter + this.markers.format;
    },
    
    getAllMarkers: function() {
        return this.alphabets.list.map(letter => ({
            letter: letter,
            markerPath: this.getMarkerPath(letter),
            modelPath: this.getModelPath(letter)
        }));
    },
    
    // Helper method to get ARjs scene attributes
    getArjsAttributes: function() {
        return `sourceType: ${this.arjs.sourceType}; 
                detectionMode: ${this.arjs.detectionMode}; 
                matrixCodeType: ${this.arjs.matrixCodeType};
                debugUIEnabled: ${this.arjs.debugUIEnabled};`;
    }
};

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ARConfig;
}
