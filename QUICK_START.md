# AR Alphabets A-Z - Quick Start Guide

## ⚡ 5-Minute Setup

### 1. **Start Web Server** (2 minutes)
```bash
# Navigate to project directory
cd /home/abhishek/Work/ditvi-technologies/ar/ar_v2

# Start server using Python 3
python3 -m http.server 8000

# Or using Node.js
npx http-server -p 8000
```
✓ Server running at: http://localhost:8000

### 2. **Access the Application** (1 minute)
- Open browser: http://localhost:8000
- Allow camera access when prompted
- You should see AR interface

### 3. **Create Markers** (2 minutes)
Visit: https://jeromeetienne.github.io/AR.js/three.js/examples/marker-training/
- Upload alphabet images (A-Z)
- Download .patt files
- Save to `assets/markers/`

---

## 📁 Project Structure

```
ar_v2/
├── index.html              ← Main page
├── css/
│   └── style.css          ← Styling
├── js/
│   ├── app.js             ← Main application
│   ├── config.js          ← Configuration
│   └── markerGenerator.js ← Utilities
└── assets/
    ├── 3dmodels/          ← 3D models (A-Z)
    │   └── [Place A.gltf, B.gltf, ... Z.gltf here]
    └── markers/           ← Marker patterns (A-Z)
        └── [Place pattern-A.patt, pattern-B.patt, ... here]
```

---

## 🎯 What to Do Next

### Step 1: Prepare 3D Models
**What you need**: 3D model files (A-Z)
- Format: .gltf, .glb
- Location: `assets/3dmodels/`
- Files: A.glb, B.glb, C.glb, ... Z.glb

**How to get them:**
1. Option A: Download from Sketchfab (https://sketchfab.com)
2. Option B: Create in Blender (https://www.blender.org)
3. Option C: Use Free3D (https://free3d.com)

**Quick download example:**
```bash
# Create placeholder models (if you don't have real ones yet)
cd assets/3dmodels/
# Download or create A.glb, B.glb, etc.
```

### Step 2: Generate Marker Files
**What you need**: Pattern marker files (A-Z)
1. Go to: https://jeromeetienne.github.io/AR.js/three.js/examples/marker-training/
2. Create marker images (letter images with high contrast)
3. Upload each to the tool
4. Download .patt file
5. Save as `pattern-A.patt`, `pattern-B.patt`, etc.
6. Place in `assets/markers/`

**Example marker image:**
- Size: 512x512 pixels
- Content: Black letter "A" on white background
- No background colors or patterns

### Step 3: Test in Browser
1. Ensure both model files and marker files are in place
2. Refresh page: http://localhost:8000
3. Point camera at printed marker
4. 3D model should appear

---

## 🚀 Running the Application

### Development Mode
```bash
# In project directory
python3 -m http.server 8000

# Then open in browser
# http://localhost:8000
```

### With Node.js
```bash
npm install
npm start
```

### On Mobile Device
1. Get your computer IP: `ipconfig getifaddr en0` (Mac) or `hostname -I` (Linux)
2. Allow HTTP on network (not HTTPS required for localhost)
3. Access from phone: http://YOUR_IP:8000

---

## 📋 Checklist

- [ ] 3D model files downloaded/created (A-Z)
  - [ ] Files: A.glb, B.glb, ... Z.glb
  - [ ] Location: assets/3dmodels/
  - [ ] Format: .glb or .gltf

- [ ] Marker pattern files generated (A-Z)
  - [ ] Files: pattern-A.patt, pattern-B.patt, ... Z.patt
  - [ ] Location: assets/markers/
  - [ ] Format: .patt files

- [ ] Web server running
  - [ ] Command: python3 -m http.server 8000
  - [ ] URL: http://localhost:8000

- [ ] Markers printed
  - [ ] Size: 10x10 cm recommended
  - [ ] Quality: High DPI (300+)
  - [ ] Material: Matte paper

- [ ] Testing completed
  - [ ] Camera access working
  - [ ] Markers detected
  - [ ] 3D models appearing
  - [ ] Mobile browser tested (optional)

---

## 🔧 Troubleshooting Quick Fixes

| Problem | Fix |
|---------|-----|
| **Models not showing** | Check files in `assets/3dmodels/` |
| **Markers not detected** | Print markers, improve lighting |
| **Camera not working** | Check browser permissions, use HTTPS or localhost |
| **Slow performance** | Close other tabs, reduce model complexity |
| **Server error** | Verify Python version (`python3 --version`) |

---

## 📖 Detailed Guides

For more information, see:
- **README.md** - Full project documentation
- **3D_MODELS_GUIDE.md** - 3D model creation and setup
- **MARKER_GUIDE.md** - Marker types and generation

---

## 🎓 Marker Type Used

**Pattern-Based Markers (.patt files)**
- ✓ Works with any image
- ✓ Easy to customize
- ✓ 26 unique markers (one per letter)
- ✓ NFT-compatible format

See MARKER_GUIDE.md for detailed information.

---

## 📱 Browser Support

| Browser | Support | Mobile |
|---------|---------|--------|
| Chrome | ✓ | ✓ |
| Firefox | ✓ | ✓ |
| Safari | ✓ | ✓ (iOS 14.5+) |
| Edge | ✓ | ✓ |

---

## ⚡ Quick Commands

```bash
# Start server
python3 -m http.server 8000

# Check Python version
python3 --version

# List contents of markers folder
ls -la assets/markers/

# List contents of 3dmodels folder
ls -la assets/3dmodels/
```

---

## 🆘 Need Help?

1. **Check Console**: Press F12 → Console tab for errors
2. **Check Files**: Verify all files are in correct locations
3. **Check Paths**: Ensure file names match HTML references
4. **Check Permissions**: Verify folder permissions (readable)
5. **Restart**: Clear browser cache and reload

---

## 📚 Learning Resources

- **AR.js Official Docs**: https://ar-js-org.github.io/AR.js-Docs/
- **A-Frame Tutorial**: https://aframe.io/docs/
- **Blender Beginner Guide**: https://docs.blender.org/
- **GLTF Format**: https://www.khronos.org/gltf/

---

**Version**: 1.0.0
**Last Updated**: February 8, 2026
**Next Step**: Follow the checklist above ✓

Happy AR Learning! 🎉
