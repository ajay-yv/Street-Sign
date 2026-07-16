<div align="center">

# 🛣️ Inscribed Street Sign Transliteration & Multilingual Accessibility

### AI-Powered Street Sign Recognition, Transliteration, Translation, and Voice Assistance

<p align="center">

<img src="https://img.shields.io/badge/JavaScript-ES6-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">

<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white">

<img src="https://img.shields.io/badge/OCR-Tesseract.js-success?style=for-the-badge">

<img src="https://img.shields.io/badge/PWA-Offline-blue?style=for-the-badge">

<img src="https://img.shields.io/badge/AI-Multilingual-orange?style=for-the-badge">

<img src="https://img.shields.io/badge/License-MIT-brightgreen?style=for-the-badge">

</p>

### Breaking Language Barriers Through Intelligent Street Sign Recognition

**OCR • Transliteration • Translation • Text-to-Speech • Offline Support • Accessibility**

</div>

---

# 📖 About the Project

**Inscribed Street Sign Transliteration & Multilingual Accessibility** is an AI-powered web application developed to make street signs understandable for people who cannot read the local language.

The system captures text from street sign images using Optical Character Recognition (OCR), transliterates the detected text into different writing systems while preserving pronunciation, translates it into the user's preferred language, and provides speech output for improved accessibility.

The application is designed to assist tourists, migrants, delivery personnel, emergency responders, and visually impaired users in multilingual environments.

---

# 🎯 Problem Statement

In multilingual regions, street signs are often displayed only in the local script, making navigation difficult for visitors and non-native speakers.

Users frequently face challenges such as:

* Inability to read unfamiliar scripts
* Difficulty pronouncing place names
* Navigation errors
* Delays during emergencies
* Accessibility limitations for visually impaired individuals

This project addresses these challenges by combining OCR, transliteration, translation, and speech technologies into a single accessible platform.

---

# ✨ Key Features

## 📷 OCR-Based Street Sign Recognition

* Capture street sign images
* Detect printed text
* Extract multilingual content
* Real-time OCR processing

---

## 🔤 Intelligent Transliteration

Convert text between different writing systems while preserving pronunciation.

Examples:

* Kannada → English
* Tamil → Hindi
* Telugu → English
* Bengali → English
* Malayalam → Hindi

---

## 🌍 Multi-Language Translation

Translate recognized street signs into multiple Indian and international languages.

Supported Languages

* English
* Kannada
* Hindi
* Tamil
* Telugu
* Malayalam
* Bengali
* Marathi

---

## 🔊 Text-to-Speech

Read translated street signs aloud.

Useful for:

* Visually impaired users
* Tourists
* Senior citizens
* Emergency situations

---

## 📱 Progressive Web Application (PWA)

* Installable on mobile devices
* Responsive interface
* Offline capability
* Fast loading

---

## 🌐 Offline Support

The application continues to provide core functionality even in areas with limited or no internet connectivity.

---

# 🏗️ System Architecture

```text
User Captures Street Sign
            │
            ▼
      Image Processing
            │
            ▼
     OCR (Tesseract.js)
            │
            ▼
   Extracted Street Text
            │
 ┌──────────┼──────────┐
 ▼          ▼          ▼
Script   Translation  Text-to-
Detection     API      Speech
 │          │          │
 └──────────┼──────────┘
            ▼
 Multilingual Output
            │
            ▼
 Display & Voice Output
```

---

# 🔄 Workflow

```text
Capture Image
      │
      ▼
OCR Text Extraction
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
Speech Synthesis
      │
      ▼
User Output
```

---

# 🛠️ Technology Stack

### Frontend

* HTML5
* CSS3
* JavaScript (ES6)

### Backend

* Node.js
* Express.js

### OCR

* Tesseract.js

### AI & Language Processing

* Transliteration Engine
* Translation APIs

### Accessibility

* Browser Speech Synthesis
* Text-to-Speech APIs

### Progressive Web App

* Service Worker
* Web App Manifest

---

# 📂 Project Structure

```text
Street-Sign/
│
├── app.js
├── transliterator.js
├── dictionary.js
├── index.html
├── styles.css
├── manifest.json
├── sw.js
├── package.json
├── assets/
└── README.md
```

---

# 🚀 Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate to the project:

```bash
cd Street-Sign-main
```

Install dependencies:

```bash
npm install
```

---

# ▶️ Running the Project

Start the development server:

```bash
npm start
```

or

```bash
node app.js
```

Open your browser and visit:

```text
http://localhost:3000
```

---

# 📋 Prerequisites

* Node.js (v18 or later)
* npm
* Modern web browser (Chrome, Edge, Firefox)

Verify installation:

```bash
node -v
npm -v
```

---

# 🌍 Supported Languages

* English
* Kannada
* Hindi
* Tamil
* Telugu
* Malayalam
* Bengali
* Marathi

---

# 🎯 Real-World Applications

* Smart Cities
* Tourism
* Public Transportation
* Emergency Services
* Delivery & Logistics
* Accessibility for Visually Impaired
* Navigation Assistance
* Government Infrastructure

---

# 🚀 Future Enhancements

* Real-time Camera OCR
* GPS-Based Navigation Integration
* AI-Based Script Recognition
* Offline Language Models
* Mobile Application
* Cloud Synchronization
* Voice Command Support
* AR-Based Street Sign Recognition
* Additional International Languages

---

# 🌟 Advantages

* Improves multilingual accessibility
* Supports inclusive navigation
* Works in online and offline environments
* Preserves pronunciation through transliteration
* Enhances public infrastructure accessibility
* Easy-to-use interface

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a feature branch:

```bash
git checkout -b feature-name
```

3. Commit your changes:

```bash
git commit -m "Add new feature"
```

4. Push your branch:

```bash
git push origin feature-name
```

5. Open a Pull Request.

---

# 📄 License

This project is licensed under the MIT License.

---

<div align="center">

## ⭐ If you found this project useful, consider giving it a Star!

Built to promote multilingual accessibility and inclusive navigation through AI-powered OCR and transliteration.

</div>
