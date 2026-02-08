# AR Marker Types and Setup Guide

## Marker Type Used: Pattern-Based Markers (.patt files)

This AR Alphabets A-Z project uses **Pattern-Based Markers**, which are NFT (Natural Feature Tracking) compatible marker files.

---

## Overview of Marker Types

### 1. Pattern-Based Markers (.patt) - ✓ USED IN THIS PROJECT
```
Type: Binary pattern files
Format: .patt files (16x16 grid)
Encoding: Black and white pattern
Size: ~100KB per file
```

**Pros:**
- ✓ Works with any image
- ✓ High precision detection
- ✓ Works at various angles
- ✓ Educational friendly
- ✓ Easy to generate

**Cons:**
- ✗ Requires distinct unique patterns
- ✗ Sensitive to lighting
- ✗ Needs good camera quality

### 2. Hiro/Kanji Markers (Pre-built)
```
Type: Standard test markers
Format: PNG/SVG (printed)
Size: Approx 10x10 cm
```

**Pros:**
- ✓ Pre-made, ready to use
- ✓ Quick setup
- ✓ Good for testing

**Cons:**
- ✗ Limited options (only 2 markers)
- ✗ Not suitable for 26 letters
- ✗ Less customizable

### 3. QR Code / Barcode Markers
```
Type: Machine-readable codes
Format: QR codes, Barcodes
Detection: High speed
```

**Pros:**
- ✓ Very fast detection
- ✓ Reliable encoding
- ✓ Standardized format

**Cons:**
- ✗ Not visually appealing
- ✗ Difficult to customize per letter
- ✗ Less natural in educational context

### 4. Image-Based Markers (NFT)
```
Type: Natural Feature Tracking
Format: Generated from images
Detection: Feature-based
```

**Pros:**
- ✓ Any image can be a marker
- ✓ Very visual and engaging
- ✓ Good for branding

**Cons:**
- ✗ Requires preprocessing
- ✗ Can be slow to detect
- ✗ Complex setup

---

## Pattern Marker Format (.patt)

### File Structure
A .patt file contains a 16x16 binary grid:
- **Total lines**: 16 (representing 16 rows)
- **Values per line**: 16 (representing 16 columns)
- **Range**: 0 (white) or 1 (black)

### Example .patt Content
```
255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255
255   0   0   0   0   0 255 255 255 255 255 255 255 255 255 255
255   0 255 255 255   0 255 255 255 255 255 255 255 255 255 255
255   0 255 255 255   0 255 255 255 255 255 255 255 255 255 255
255   0 255 255 255   0 255 255 255 255 255 255 255 255 255 255
255   0   0   0   0   0 255 255 255 255 255 255 255 255 255 255
255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255
... (remaining rows)
```

### How It Works
1. Pattern creates unique "fingerprint" for each marker image
2. AR.js recognizes these patterns in camera stream
3. Patterns work from different angles and distances
4. Border pixels help with orientation detection

---

## Creating Pattern Markers

### Method 1: Using Official AR.js Tool (RECOMMENDED)

#### Steps:
1. Visit: **https://jeromeetienne.github.io/AR.js/three.js/examples/marker-training/**
2. For each letter A-Z:
   - Prepare an image file (512x512 PNG or JPG recommended)
   - Click "Upload image"
   - Adjust threshold slider for optimal pattern
   - Download the generated `.patt` file
   - Rename to `pattern-A.patt`, `pattern-B.patt`, etc.
3. Place all files in `assets/markers/` folder

#### Image Recommendations:
- **Size**: 512x512 or 1024x1024 pixels
- **Format**: PNG (for transparency) or JPG
- **Content**: Letter with high contrast background
- **Background**: Pure white (#FFFFFF)
- **Letter**: Pure black (#000000) or high contrast color
- **Border**: White space around letter
- **Symmetry**: Avoid perfectly symmetrical designs (confuses detection)

#### Example Image:
```
White background (#FFFFFF)
┌──────────────────────────┐
│                          │
│        AAAAA             │
│       A     A            │
│       A     A            │
│       AAAAAAA            │
│       A     A            │
│       A     A            │
│                          │
└──────────────────────────┘
```

### Method 2: Using Node.js (Advanced)

#### Installation:
```bash
npm install -g ar-js-marker-training
# or
npm install ar-js-marker-training
```

#### Usage:
```bash
ar-js-marker-training --input image.png --output pattern.patt

# With options:
ar-js-marker-training \
  --input image.png \
  --output pattern.patt \
  --threshold 128 \
  --size 16
```

### Method 3: Using Python Script (Advanced)

Create a Python script to generate .patt files:
```python
from PIL import Image
import numpy as np

def create_patt_from_image(image_path, output_path):
    # Load image
    img = Image.open(image_path)
    img = img.resize((16, 16))
    
    # Convert to grayscale
    gray = img.convert('L')
    
    # Convert to binary (0 or 255)
    threshold = 128
    binary = np.array(gray) > threshold
    binary = binary.astype(np.uint8) * 255
    
    # Write .patt file
    with open(output_path, 'w') as f:
        for row in binary:
            f.write(' '.join(str(val) for val in row) + '\n')

# Usage:
for letter in 'ABCDEFGHIJKLMNOPQRSTUVWXYZ':
    create_patt_from_image(
        f'alphabet_{letter}.png',
        f'pattern-{letter}.patt'
    )
```

---

## Marker File Naming Convention

### Required Format:
```
pattern-A.patt
pattern-B.patt
pattern-C.patt
... 
pattern-Z.patt
```

### Directory Structure:
```
assets/
└── markers/
    ├── pattern-A.patt
    ├── pattern-B.patt
    ├── pattern-C.patt
    └── ... (A-Z)
```

### Mapping in HTML:
```html
<a-marker type="pattern" url="assets/markers/pattern-A.patt">
    <a-entity gltf-model="url(assets/3dmodels/A.glb)"></a-entity>
</a-marker>
```

---

## Marker Detection Parameters

### AR.js Detection Configuration (in index.html):
```html
<a-scene embedded arjs="
    sourceType: webcam;           <!-- Camera source -->
    detectionMode: mono;          <!-- 'mono' or 'color' -->
    matrixCodeType: 3x3;          <!-- QR code type if used -->
    patternRatio: 0.8;            <!-- Pattern size ratio -->
    debugUIEnabled: false;">
```

### Key Parameters:

| Parameter | Value | Purpose |
|-----------|-------|---------|
| `sourceType` | `webcam` | Use device camera |
| `detectionMode` | `mono` | Better for B&W markers |
| `patternRatio` | `0.8` | Marker should be 80% of image |
| `debugUI` | `false` | Hide debug overlay |

---

## Testing and Printing Markers

### Step 1: Generate Markers
1. Create marker images (letters A-Z with high contrast)
2. Upload to AR.js tool
3. Download .patt files

### Step 2: Verify Markers
1. Download printed marker template from AR.js tool
2. Print at actual size (typically 10x10 cm)
3. Place on dark background for testing
4. Test in AR application

### Step 3: Print Final Markers

#### Printing Recommendations:
- **Paper**: Matte paper (glossy can cause reflections)
- **Color**: Full color for visual appeal
- **Size**: 10x10 cm (can vary, but maintain consistency)
- **Quality**: High DPI (300+ recommended)
- **Mounting**: Mount on rigid board for stability

#### Printing at Home:
```bash
# Use any image editor to create marker image
# Set image to 10x10 cm at 300 DPI
# Print to PDF or directly to printer
# Mount on cardboard if needed
```

#### Printing at Print Shop:
1. Provide .patt file details or marker image
2. Request: High quality, matte finish, 300 DPI
3. Ask for: Multiple copies for testing/distribution

---

## Marker Performance Factors

### Factors Affecting Detection:

#### ✓ Helps Detection:
- High contrast (black on white, or vice versa)
- Good lighting conditions
- Steady camera movement
- Flat marker surface
- Clean, undamaged marker
- Adequate distance (20-50cm from camera)

#### ✗ Hurts Detection:
- Low lighting
- Glossy surfaces (reflections)
- Wrinkled or damaged markers
- Fast camera movement
- Shadows on marker
- Too close or too far
- Tilted at extreme angles

---

## Marker Comparison Table

| Feature | Pattern | Hiro | QR Code | Image (NFT) |
|---------|---------|------|---------|------------|
| Setup Difficulty | Medium | Easy | Easy | Hard |
| Detection Speed | Fast | Very Fast | Very Fast | Slow |
| Customization | High | Low | Low | High |
| Visual Appeal | High | Medium | Low | High |
| Robustness | High | High | Very High | Medium |
| File Size | Small | N/A | N/A | Large |
| Suitable for A-Z | Yes | No | No | Yes |
| Cost | Free | Free | Free | Free |

---

## Troubleshooting Marker Detection

### Problem: Marker not detected
**Solutions:**
1. Increase lighting
2. Move closer to camera
3. Verify .patt file is in correct folder
4. Check marker image has high contrast
5. Regenerate .patt file with adjusted threshold

### Problem: Intermittent detection
**Solutions:**
1. Improve lighting conditions
2. Print marker with better quality
3. Increase marker size
4. Reduce fast movement of camera
5. Clean camera lens

### Problem: Marker detected but model doesn't appear
**Solutions:**
1. Verify model file exists in `assets/3dmodels/`
2. Check model file path in HTML
3. Check browser console for errors (F12)
4. Verify file permissions
5. Try different model format (GLB vs GLTF)

### Problem: Slow detection
**Solutions:**
1. Reduce model complexity
2. Use monochrome detection mode
3. Lower camera resolution
4. Close other browser tabs
5. Check device performance

---

## Advanced: Custom Marker Generation

### Using Python and OpenCV:
```python
import cv2
import numpy as np

def create_marker_pattern(letter, output_path):
    # Create image with letter
    img = np.ones((512, 512, 3), dtype=np.uint8) * 255
    
    # Add letter text
    font = cv2.FONT_HERSHEY_SIMPLEX
    cv2.putText(img, letter, (150, 400), font, 10, (0, 0, 0), 20)
    
    # Save image
    cv2.imwrite(f'marker_{letter}.png', img)

# Generate all markers
for letter in 'ABCDEFGHIJKLMNOPQRSTUVWXYZ':
    create_marker_pattern(letter, f'pattern-{letter}.patt')
```

---

## Resources

- **AR.js Documentation**: https://ar-js-org.github.io/AR.js-Docs/
- **Marker Generator Tool**: https://jeromeetienne.github.io/AR.js/three.js/examples/marker-training/
- **Pattern Marker Format**: https://github.com/artoolkitx/artoolkit5
- **NFT Marker Guide**: https://ar-js-org.github.io/AR.js-Docs/nft-guide

---

## Summary

**Key Points:**
1. ✓ Pattern-based markers (.patt files) work perfectly for A-Z project
2. ✓ Easy to create with official AR.js tool
3. ✓ Good balance of customization and reliability
4. ✓ Suitable for educational use
5. ✓ Free to generate and use

**Next Steps:**
1. Create marker images for A-Z
2. Generate .patt files using AR.js tool
3. Place in `assets/markers/` folder
4. Print and test markers
5. Adjust detection parameters if needed

---

**Last Updated**: February 8, 2026
