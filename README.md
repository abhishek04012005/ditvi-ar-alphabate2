# AR Alphabets A-Z Project

A web-based Augmented Reality application using AR.js that displays 3D alphabet models (A-Z) when pointing a camera at corresponding markers.

## Project Structure

```
ar_v2/
├── index.html                 # Main HTML file
├── css/
│   └── style.css             # Stylesheet
├── js/
│   ├── app.js                # Main application logic
│   └── markerGenerator.js    # Marker generation utilities
└── assets/
    ├── 3dmodels/             # 3D model files (.gltf, .glb)
    │   ├── A.gltf
    │   ├── B.gltf
    │   └── ... (A-Z)
    └── markers/              # Marker pattern files (.patt)
        ├── pattern-A.patt
        ├── pattern-B.patt
        └── ... (A-Z)
```

## Marker Type: Pattern-Based Markers

This project uses **Pattern-Based Markers** (.patt files), which are:

### Key Features:
- **Format**: Binary pattern files (.patt extension)
- **Compatibility**: Works with AR.js and other AR frameworks
- **Detection Method**: NFT (Natural Feature Tracking) compatible
- **Encoding**: 16x16 grid representing black/white pattern
- **Robustness**: Works from different angles and distances

### Advantages:
✓ Easy to generate and customize
✓ Works with any image as a marker
✓ Good for educational purposes
✓ Doesn't require QR codes
✓ Can be printed on any material

### Disadvantages:
✗ Requires distinct, unique markers for each letter
✗ Lighting conditions affect detection
✗ High contrast images work better
✗ Needs good camera resolution

## How Markers Work

1. **Pattern Generation**
   - Each marker image is analyzed
   - Unique pattern extracted and saved as .patt file
   - AR.js recognizes these patterns in real-time

2. **Detection Process**
   - Camera streams video input
   - AR.js analyzes each frame
   - Compares against known .patt files
   - Triggers model when match found

3. **3D Model Display**
   - When marker detected, corresponding 3D model appears
   - Model is positioned relative to marker
   - Can be rotated and scaled

## Setup Instructions

### 1. Clone or Extract Project
```bash
cd /home/abhishek/Work/ditvi-technologies/ar/ar_v2
```

### 2. Create 3D Models
Place 3D model files in `assets/3dmodels/` folder:
- Format: GLTF (.gltf) or GLB (.glb)
- Files: A.gltf, B.gltf, C.gltf, ... Z.gltf
- Scale: Recommend 0.5-1.0 units for optimal display

**3D Model Sources**:
- Sketchfab: https://sketchfab.com
- TurboSquid: https://www.turbosquid.com
- Free3D: https://free3d.com
- Blender: Create custom models

### 3. Generate Marker Files

#### Method 1: Using Online Tool (Recommended)
1. Visit: https://jeromeetienne.github.io/AR.js/three.js/examples/marker-training/
2. For each letter (A-Z):
   - Prepare a unique image (alphabet letter with high contrast)
   - Upload to marker generator
   - Download the generated .patt file
   - Save as `pattern-A.patt`, `pattern-B.patt`, etc.
3. Place all .patt files in `assets/markers/` folder

#### Method 2: Using Command Line (Advanced)
```bash
# Install AR.js tools
npm install -g ar-js-marker-training

# Generate markers
ar-js-marker-training --input image.png --output pattern.patt
```

### 4. Create Marker Images
Recommended specifications:
- Size: 256x256 pixels
- Format: PNG or JPG
- Content: Letter with high contrast background
- Example: Black letter on white background
- Avoid: Symmetrical patterns, low contrast

### 5. Run the Application

#### Option A: Local Server (Recommended)
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js http-server
npx http-server

# Using PHP
php -S localhost:8000
```

#### Option B: Direct File Access
- Open `index.html` directly in browser (limited functionality)
- Some browsers block camera access for file:// URLs

### 6. Test the AR Experience
1. Open http://localhost:8000 in browser
2. Allow camera access
3. Print markers and point at them
4. 3D models should appear in AR view

## Browser Compatibility

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome | ✓ | Best support, mobile-friendly |
| Firefox | ✓ | Good support |
| Safari | ✓ | iOS 14.5+ required |
| Edge | ✓ | Chromium-based |
| Mobile Chrome | ✓ | Recommended for mobile |
| Mobile Safari | ✓ | iOS 14.5+ |

## Required Permissions
- Camera access (webcam)
- HTTPS or localhost (for camera access)

## File Format Details

### .patt File Format
```
# 16x16 binary grid
# Each line represents a row
# 0 = white, 1 = black
255 255 255 255 ... (repeated 16 times per row)
255 255 255 255 ... (16 rows total)
```

### GLTF Model Format
- Supported: .gltf (+ accompanying .bin), .glb
- Compression: GLB recommended for smaller file size
- Textures: Embedded in GLB or separate files in .gltf

## Customization

### Change Model Scale
Edit `index.html`:
```html
<a-entity
    gltf-model="url(assets/3dmodels/A.gltf)"
    scale="1 1 1"  <!-- Adjust this -->
    position="0 0 0"
    rotation="0 0 0">
</a-entity>
```

### Change Detection Mode
Edit `index.html`:
```html
<a-scene embedded arjs="
    sourceType: webcam; 
    detectionMode: mono;      <!-- or 'color' -->
    matrixCodeType: 3x3;
    debugUIEnabled: false;">
```

### Add Sound Effects
Edit `js/app.js` and uncomment:
```javascript
function playSound(letter) {
    new Audio(`assets/audio/${letter}.mp3`).play();
}
```

## Performance Optimization

### Tips:
1. Optimize 3D models (keep polygon count low)
2. Use GLB format instead of separate GLTF files
3. Compress marker images (512x512 max recommended)
4. Disable debug UI for production
5. Use efficient lighting in 3D models

### File Size Recommendations:
- Each .gltf/.glb: < 5MB
- Each .patt: < 100KB
- Marker images: < 500KB each

## Troubleshooting

### Issue: Models not appearing
**Solutions**:
- Verify marker images are high contrast
- Check that .patt files are in correct folder
- Ensure model file paths are correct in HTML
- Check browser console for errors (F12)

### Issue: Slow performance
**Solutions**:
- Reduce 3D model polygon count
- Use GLB format instead of GLTF
- Close other browser tabs
- Check device camera specifications

### Issue: Camera not working
**Solutions**:
- Check camera permissions in browser settings
- Use HTTPS or localhost
- Try different browser
- Restart device

### Issue: Marker not detected
**Solutions**:
- Improve lighting conditions
- Print marker with high quality
- Ensure marker is within camera view
- Check that .patt file is properly generated

## Advanced Features (To Implement)

- [ ] Audio pronunciation for each letter
- [ ] Animation transitions when marker detected
- [ ] Marker placement indicator
- [ ] Multiple 3D models per letter
- [ ] Interactive learning mode
- [ ] Progress tracking
- [ ] PDF export of experience
- [ ] Touch controls for mobile

## Dependencies

- **AR.js 3.4.5**: Augmented Reality library
- **A-Frame 1.4.2**: WebGL 3D framework
- **Three.js**: 3D rendering (included in AR.js)

## License

MIT License - Feel free to use for educational purposes

## Resources

- [AR.js Documentation](https://ar-js-org.github.io/AR.js-Docs/)
- [A-Frame Documentation](https://aframe.io/docs/)
- [GLTF Specification](https://www.khronos.org/gltf/)
- [Marker Generator Tool](https://jeromeetienne.github.io/AR.js/three.js/examples/marker-training/)

## Support

For issues or questions:
1. Check browser console (F12) for errors
2. Verify file paths and permissions
3. Test with different markers
4. Check AR.js community forum

---

**Created**: 2026
**Last Updated**: February 8, 2026
**Version**: 1.0.0
