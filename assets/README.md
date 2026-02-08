# README for Assets Folders

## This directory contains AR project assets

### 3dmodels/ Folder
Place your 3D model files here:
- A.glb or A.gltf
- B.glb or B.gltf
- ... (continue for all 26 letters)

Format: GLTF (.gltf + .bin) or GLB (.glb)
Size: Recommended < 5MB each

### markers/ Folder
Place your marker pattern files here:
- pattern-A.patt
- pattern-B.patt
- ... (continue for all 26 letters)

Format: .patt files generated from AR.js Marker Generator
See MARKER_GUIDE.md for instructions

## How to Create Assets

### 3D Models:
1. Download from Sketchfab: https://sketchfab.com
2. Create in Blender: https://www.blender.org
3. Use Free3D: https://free3d.com
4. Save as A.glb, B.glb, ... Z.glb

### Markers:
1. Visit: https://jeromeetienne.github.io/AR.js/three.js/examples/marker-training/
2. Upload alphabet images for each letter
3. Download generated .patt files
4. Save as pattern-A.patt, pattern-B.patt, ... Z.patt

## File Structure Example

```
assets/
├── 3dmodels/
│   ├── A.glb
│   ├── B.glb
│   ├── C.glb
│   └── ... (D-Z)
└── markers/
    ├── pattern-A.patt
    ├── pattern-B.patt
    ├── pattern-C.patt
    └── ... (D-Z)
```

See the documentation in the project root for more details:
- README.md - Full documentation
- QUICK_START.md - Quick setup
- MARKER_GUIDE.md - Marker information
- 3D_MODELS_GUIDE.md - 3D model guide
