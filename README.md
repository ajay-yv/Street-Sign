# LipiSetu - Street Sign Transliteration App

A web application to transliterate Indian street signs into your preferred script.

## 🚀 How to Run

Because this application uses advanced browser features (Camera access, Web Workers for OCR), modern browsers **require** it to be served via a local server (HTTPS or localhost). It will **not** work correctly if you just double-click `index.html`.

### Option 1: VS Code (Recommended)
1. Install the "Live Server" extension in VS Code.
2. Right-click `index.html` and select "Open with Live Server".

### Option 2: Python
If you have Python installed, open a terminal in this folder and run:
```bash
python -m http.server
```
Then open `http://localhost:8000` in your browser.

### Option 3: Node.js
If you have Node.js installed:
```bash
npx http-server .
```

## 📱 Features
- **Camera Support**: Capture signs directly (requires HTTPS or localhost).
- **Multi-Script Support**: Transliterate between 10+ Indian scripts.
- **Offline-First Design**: Uses Tesseract.js and Sanscript.js which run entirely in the browser.

## ⚠️ Known Limitations
- Initial load might be slow as it downloads OCR language data.
- OCR accuracy depends heavily on lighting and image clarity.
