// Marker Generator Helper - Creates pattern marker files
// AR.js uses .patt files which are marker pattern definitions

const MarkerGenerator = {
    /**
     * Generate marker patterns for each alphabet
     * Note: In production, you would use AR.js marker generator
     * at: https://jeromeetienne.github.io/AR.js/three.js/examples/marker-training/
     */
    
    generateMarkerFile: function(letter) {
        // This is a placeholder - actual .patt files must be generated
        // using the AR.js Marker Generator tool
        const patternData = this.createPatternData(letter);
        return patternData;
    },
    
    createPatternData: function(letter) {
        // Pattern marker format for AR.js
        // .patt files are 16x16 grid of 0s and 1s representing the marker
        // This is a simplified representation
        
        const width = 16;
        const height = 16;
        const borderSize = 2;
        
        let pattern = [];
        
        // Create a basic pattern based on letter
        for (let i = 0; i < height; i++) {
            let row = [];
            for (let j = 0; j < width; j++) {
                // Border (always 1)
                if (i < borderSize || i >= height - borderSize || 
                    j < borderSize || j >= width - borderSize) {
                    row.push(1);
                } else {
                    // Pattern based on letter ASCII code
                    const charCode = letter.charCodeAt(0);
                    row.push((charCode + i + j) % 2);
                }
            }
            pattern.push(row);
        }
        
        return pattern;
    },
    
    getMarkerPath: function(letter) {
        return `assets/markers/pattern-${letter}.patt`;
    },
    
    getAllMarkerPaths: function() {
        const alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
                          'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        return alphabets.map(letter => this.getMarkerPath(letter));
    },
    
    /**
     * Instructions for creating actual markers:
     * 
     * 1. Use the official AR.js Marker Generator:
     *    https://jeromeetienne.github.io/AR.js/three.js/examples/marker-training/
     * 
     * 2. Steps:
     *    a) Upload a unique image for each letter (A-Z)
     *    b) The tool will generate a .patt file
     *    c) Download the .patt file and place in assets/markers/
     * 
     * 3. Print the markers as QR codes or images for physical detection
     */
    
    printInstructions: function() {
        console.log(`
        ========================================
        AR Marker Generation Instructions
        ========================================
        
        Marker Type Used: Pattern-Based Markers (.patt files)
        
        Steps to Create Markers:
        1. Visit: https://jeromeetienne.github.io/AR.js/three.js/examples/marker-training/
        2. Upload unique images for each letter (A-Z)
        3. Generate .patt files for each image
        4. Save files as: pattern-A.patt, pattern-B.patt, etc.
        5. Place in: assets/markers/ folder
        
        ========================================
        `);
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MarkerGenerator;
}
