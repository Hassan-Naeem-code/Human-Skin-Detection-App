# Human Skin Detection App

A React Native app that detects human skin regions in a captured image using classic color-space thresholding. Built as a practical exercise in mobile computer vision — runs entirely on device, no API calls.

![React Native](https://img.shields.io/badge/React_Native-0.7x-61DAFB?logo=react&logoColor=black)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)

## What it does

- Capture a photo with the camera or pick one from the gallery
- Process it on-device to identify pixel regions that fall inside typical human-skin color ranges
- Render the skin-mask overlay on top of the original image

The core detection uses YCbCr thresholding — the classical approach that works well enough without shipping an ML model to the device. Good starting point before upgrading to a CNN-based segmentation model.

## Why it's a useful starter

Skin detection is a small but representative mobile-CV problem. It touches:
- Camera / gallery permissions
- Image buffer access on iOS + Android
- Per-pixel math on a native thread (performance matters)
- Overlaying results on the source image

If you can do this, the scaffolding extends cleanly to any mobile-first vision feature (face detection, document scanning, object tracking).

## Quick start

```bash
git clone https://github.com/Hassan-Naeem-code/Human-Skin-Detection-App.git
cd Human-Skin-Detection-App

npm install
cd ios && pod install && cd ..

# Run on iOS
npx react-native run-ios

# Or Android
npx react-native run-android
```

## Project structure

```
.
├── App.js                          # root component + safe-area wrapper
├── src/
│   └── screens/
│       └── skinDetector/           # detection screen + logic
├── ios/
├── android/
└── package.json
```

## Roadmap

- [ ] Swap color-space thresholding for a small on-device segmentation model (MediaPipe or Vision Framework)
- [ ] Live-camera mode (stream frames, not just stills)
- [ ] Export masked PNG

## License

MIT
