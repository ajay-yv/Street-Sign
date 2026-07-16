<div align="center">

# 🛣️ Street Sign Transliteration Tool

### AI-Powered Multilingual Street Sign Recognition, Transliteration & Accessibility Platform

<p align="center">

<img src="https://img.shields.io/badge/Smart%20India%20Hackathon-2025-orange?style=for-the-badge">
<img src="https://img.shields.io/badge/JavaScript-ES6-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
<img src="https://img.shields.io/badge/OCR-Tesseract.js-success?style=for-the-badge">
<img src="https://img.shields.io/badge/PWA-Enabled-blue?style=for-the-badge">
<img src="https://img.shields.io/badge/Accessibility-Text--to--Speech-green?style=for-the-badge">

</p>

### Breaking Language Barriers Through Intelligent Street Sign Recognition

**OCR • Transliteration • Translation • Text-to-Speech • Offline Support • Progressive Web App**

---

## 📖 Overview

Street Sign Transliteration Tool is an AI-powered web and mobile application developed for **Smart India Hackathon 2025** under the **Heritage and Culture** theme.

The application captures street sign text using OCR, detects the source language, transliterates the text into multiple Indian and international scripts, translates the meaning when required, and provides voice output for improved accessibility.

The solution is designed to help tourists, delivery personnel, emergency services, migrants, and visually impaired users navigate multilingual environments efficiently.

---

# ✨ Features

## 📸 OCR-Based Text Recognition

* Capture street signs using a camera
* Extract printed text using OCR
* Support for multiple Indian scripts

---

## 🌐 Intelligent Transliteration

* Convert scripts without changing pronunciation
* Preserve place names accurately
* Support multiple Indian languages

---

## 🌍 Translation

* Translate detected text into the user's preferred language
* Improve understanding for domestic and international users

---

## 🔊 Text-to-Speech

* Read detected street signs aloud
* Accessibility support for visually impaired users

---

## 📱 Progressive Web App

* Installable on mobile devices
* Responsive interface
* Offline support

---

## ⚡ Offline Mode

* Continue recognition and transliteration with limited internet connectivity
* Suitable for rural and remote areas

---

# 🎯 Problem Statement

India is home to hundreds of languages and scripts, making navigation challenging for tourists, migrants, emergency responders, and logistics personnel.

Street Sign Transliteration Tool bridges this language gap by converting unfamiliar scripts into readable forms while preserving pronunciation and meaning.

---

# 🚀 Key Benefits

* Improved navigation
* Better accessibility
* Enhanced tourism experience
* Faster emergency response
* Smart City compatibility
* Inclusive public infrastructure

---

# 🏗️ System Architecture

```text
Camera Input
      │
      ▼
 Image Processing
      │
      ▼
 OCR Engine
      │
      ▼
 Language Detection
      │
      ▼
 ┌──────────────┬──────────────┐
 ▼              ▼              ▼
Translation  Transliteration  Speech
      │              │              │
      └──────────────┼──────────────┘
                     ▼
            User-Friendly Output
```

---

# 🔄 Workflow

```text
Capture Street Sign

       │

       ▼

OCR Recognition

       │

       ▼

Language Detection

       │

       ▼

Transliteration

       │

       ▼

Translation

       │

       ▼

Text-to-Speech

       │

       ▼

Display Results
```

---

# 🛠️ Technology Stack

### Frontend

* HTML5
* CSS3
* JavaScript

### OCR

* Tesseract.js

### Translation

* Translation APIs

### Speech

* Browser Text-to-Speech

### Progressive Web App

* Service Workers
* Manifest.json

---

# 📂 Project Structure

```text
Street-Sign/
│
├── index.html
├── styles.css
├── app.js
├── transliterator.js
├── dictionary.js
├── manifest.json
├── sw.js
├── package.json
└── README.md
```

---

# ⚙️ Prerequisites

* Node.js
* npm
* Modern Web Browser

---

# 🚀 Installation

Clone the repository

```bash
git clone <repository-url>
```

Navigate to the project

```bash
cd Street-Sign
```

Install dependencies

```bash
npm install
```

---

# ▶️ Run the Project

Start the development server

```bash
npm start
```

or

```bash
npm run dev
```

If using a simple static server

```bash
npx serve .
```

Open

```text
http://localhost:3000
```

or the port displayed in your terminal.

---

# 🎯 Applications

* Smart Cities
* Tourism
* Public Transportation
* Emergency Services
* Delivery & Logistics
* Government Infrastructure
* Accessibility Solutions

---

# 🚀 Future Enhancements

* AI-based script detection
* Real-time camera translation
* Navigation integration
* AR overlays
* Offline AI models
* Voice commands
* Additional international languages

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

<div align="center">

## ⭐ If you found this project useful, please consider giving it a Star!

Built for **Smart India Hackathon 2025** to improve multilingual accessibility and inclusive navigation.

</div>
