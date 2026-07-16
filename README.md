<div align="center">

# 🛣️ Street Sign Transliteration Tool

### AI-Powered Multilingual Street Sign Recognition, Transliteration & Accessibility Platform

<p align="center">

<img src="https://img.shields.io/badge/Smart%20India%20Hackathon-2025-orange?style=for-the-badge"/>

<img src="https://img.shields.io/badge/Problem%20Statement-25155-blue?style=for-the-badge"/>

<img src="https://img.shields.io/badge/Theme-Heritage%20%26%20Culture-green?style=for-the-badge"/>

<img src="https://img.shields.io/badge/JavaScript-ES6-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"/>

<img src="https://img.shields.io/badge/OCR-Tesseract.js-success?style=for-the-badge"/>

<img src="https://img.shields.io/badge/PWA-Offline%20Ready-blue?style=for-the-badge"/>

<img src="https://img.shields.io/badge/Accessibility-Text%20to%20Speech-purple?style=for-the-badge"/>

</p>

<p align="center">

### 🌍 Breaking Language Barriers Through AI

**OCR • Transliteration • Translation • Speech Synthesis • Progressive Web App • Offline Support**

</p>

---

## 📖 Overview

**Street Sign Transliteration Tool** is an AI-powered web application developed for **Smart India Hackathon 2025** under the **Heritage and Culture** theme.

The application captures street signs using Optical Character Recognition (OCR), detects the language, transliterates text into different scripts, translates meanings into multiple languages, and provides speech output to improve accessibility.

Unlike traditional translation tools, this solution preserves the pronunciation of place names through transliteration while also offering optional translation, making navigation easier across India's multilingual environment. The project also supports offline functionality through Progressive Web App (PWA) technologies.

---

# 📑 Table of Contents

* Overview
* Problem Statement
* Objectives
* Proposed Solution
* Key Features
* System Architecture
* Project Workflow
* Technology Stack
* Folder Structure
* Installation
* Running the Project
* Usage
* Research & References
* Applications
* Future Scope
* Contributing
* License

---

# ❗ Problem Statement

India is home to hundreds of languages and scripts. Visitors, tourists, emergency responders, delivery personnel, and migrants often struggle to understand street signs written in unfamiliar regional languages.

Existing translation applications generally focus on language translation rather than transliteration, often changing the pronunciation of place names and reducing navigation accuracy.

The challenge is to build an intelligent solution that:

* Detects text from street signs.
* Preserves pronunciation through transliteration.
* Supports multiple Indian scripts.
* Works in both online and offline environments.
* Provides accessibility through speech output.

---

# 🎯 Project Objectives

* Detect street sign text using Optical Character Recognition (OCR).
* Automatically identify the source language.
* Transliterate text into multiple Indian and international scripts.
* Translate the detected content into user-selected languages.
* Generate speech output for accessibility.
* Support offline usage using Progressive Web App technologies.
* Improve navigation for multilingual users.
* Promote inclusive public infrastructure.

---

# 💡 Proposed Solution

The proposed solution combines Artificial Intelligence, OCR, transliteration, translation, and speech synthesis into a single application.

The workflow includes:

1. Capture a street sign image.
2. Extract text using OCR.
3. Detect the language.
4. Transliterate the text while preserving pronunciation.
5. Translate the meaning if requested.
6. Generate speech output.
7. Display multilingual results to the user.

The application is designed to work efficiently on mobile devices and web browsers, making it suitable for tourists, logistics personnel, emergency responders, and visually impaired users.

---

# ✨ Key Features

## 📸 Optical Character Recognition (OCR)

* Capture street signs using a camera.
* Upload existing images.
* Extract printed text accurately.
* Support multiple Indian scripts.

---

## 🌐 Intelligent Transliteration

Unlike conventional translation systems, transliteration preserves pronunciation while converting scripts.

Example:

```
ಬೆಂಗಳೂರು

↓

Bengaluru
```

instead of changing the place name.

---

## 🌍 Multilingual Translation

Translate recognized text into multiple languages.

Supported examples include:

* English
* Hindi
* Kannada
* Telugu
* Tamil
* Malayalam
* Marathi
* Bengali

---

## 🔊 Text-to-Speech

Generate speech output for recognized street signs.

Benefits:

* Accessibility
* Hands-free navigation
* Visually impaired assistance

---

## 📱 Progressive Web Application

* Installable
* Mobile friendly
* Responsive
* Offline support

---

## ⚡ Offline Mode

The application continues to perform essential functions even with limited or no internet connectivity using locally cached resources.

---

## 🎯 User-Friendly Interface

* Clean UI
* Fast response
* Mobile-first design
* Simple navigation

---

# 🏗️ High-Level System Architecture

```text
                  User
                    │
                    ▼
         Capture Street Sign
                    │
                    ▼
          Image Preprocessing
                    │
                    ▼
            OCR (Tesseract.js)
                    │
                    ▼
          Language Identification
                    │
        ┌───────────┼────────────┐
        ▼           ▼            ▼
 Transliteration Translation Text-to-Speech
        │           │            │
        └───────────┼────────────┘
                    ▼
          Display Multilingual Output
```

---

# 🔄 Project Workflow

```text
Capture Image

      │

      ▼

OCR Processing

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

Speech Generation

      │

      ▼

Display Output
```

---

# 🌟 Why This Project?

Unlike conventional OCR applications, this project focuses specifically on **Indian multilingual street signs**, preserving pronunciation through transliteration while improving accessibility with translation and voice assistance.

This makes it particularly valuable for:

* Tourists
* Delivery partners
* Emergency services
* Migrants
* Government Smart City initiatives
* Accessibility-focused public infrastructure

---
# 🛠️ Technology Stack

## Frontend

* HTML5
* CSS3
* JavaScript (ES6)

---

## OCR Engine

* Tesseract.js

---

## Transliteration

* Indic Language Mapping
* Custom Transliteration Engine
* Dictionary-based Processing

---

## Translation

* Translation APIs
* Multi-language Processing

---

## Speech Technology

* Web Speech API
* Browser Text-to-Speech

---

## Progressive Web App

* Service Workers
* Web Manifest
* Offline Cache
* Installable Web App

---

## Development Tools

* Visual Studio Code
* Git
* GitHub
* npm

---

# 📂 Project Structure

```text
Street-Sign/
│
├── assets/
│   ├── icons/
│   ├── images/
│   └── screenshots/
│
├── css/
│   └── styles.css
│
├── js/
│   ├── app.js
│   ├── transliterator.js
│   ├── dictionary.js
│   ├── ocr.js
│   └── speech.js
│
├── index.html
├── manifest.json
├── sw.js
├── package.json
├── README.md
└── LICENSE
```

---

# ⚙️ Prerequisites

Before running the project, ensure you have:

* Node.js (v18 or above)
* npm
* Modern Web Browser
* Git

Verify installation:

```bash
node -v

npm -v

git --version
```

---

# 🚀 Installation

## Step 1 Clone Repository

```bash
git clone https://github.com/your-username/street-sign-transliteration-tool.git
```

---

## Step 2 Navigate

```bash
cd street-sign-transliteration-tool
```

---

## Step 3 Install Dependencies

```bash
npm install
```

---

## Step 4 Build Project

```bash
npm run build
```

---

# ▶️ Running the Project

## Development Mode

```bash
npm run dev
```

---

## Production Mode

```bash
npm start
```

---

## Using Live Server

If you're using VS Code:

1. Install **Live Server Extension**
2. Open **index.html**
3. Right Click
4. Select

```
Open with Live Server
```

Application opens at

```
http://127.0.0.1:5500
```

---

# 📦 Dependencies

Main libraries used in the project:

```
Tesseract.js

Web Speech API

Service Worker API

Manifest API

JavaScript ES6
```

---

# ⚙️ Configuration

No additional configuration is required for basic execution.

For production deployment you may configure:

* OCR language packs
* Translation API keys
* Cache size
* Offline resources
* Browser permissions

---

# 🌐 Browser Compatibility

| Browser | Supported |
| ------- | --------- |
| Chrome  | ✅         |
| Edge    | ✅         |
| Firefox | ✅         |
| Safari  | ✅         |
| Opera   | ✅         |

---

# 📱 Progressive Web App Features

The application behaves like a native mobile app.

Features include:

* Installable
* Responsive
* Offline Mode
* Fast Loading
* Background Cache
* Mobile Optimized

---

# 📸 How It Works

### Step 1

Open the application.

↓

### Step 2

Capture or upload a street sign.

↓

### Step 3

OCR extracts the text.

↓

### Step 4

Language detection begins automatically.

↓

### Step 5

Choose preferred language.

↓

### Step 6

View transliterated result.

↓

### Step 7

Translate if required.

↓

### Step 8

Listen using Text-to-Speech.

---

# 🔒 Security

The project follows good practices:

* Browser sandboxing
* Secure APIs
* Offline cache protection
* Permission-based camera access
* No unnecessary data storage

---

# ⚡ Performance

Optimized for:

* Fast OCR
* Low latency
* Mobile devices
* Rural connectivity
* Offline execution
* Lightweight architecture

---

# 💻 Deployment

Deploy easily on

* GitHub Pages
* Netlify
* Vercel
* Firebase Hosting
* Cloudflare Pages

---

# 🌍 Accessibility

The project follows accessibility principles by providing:

* Speech Output
* Simple Navigation
* Large Buttons
* Responsive Layout
* Screen Reader Friendly Design
* Mobile Accessibility

---
# 🧠 OCR Processing Pipeline

The application uses **Optical Character Recognition (OCR)** to convert street sign images into machine-readable text.

```text
Street Sign Image
        │
        ▼
Image Preprocessing
        │
        ▼
Noise Removal
        │
        ▼
Contrast Enhancement
        │
        ▼
OCR Engine (Tesseract.js)
        │
        ▼
Extracted Text
```

### OCR Features

* High-quality text extraction
* Supports multiple Indian scripts
* Handles printed street signs
* Image preprocessing for improved accuracy
* Fast recognition on desktop and mobile devices

---

# 🔤 Transliteration Pipeline

Unlike translation, transliteration preserves pronunciation while converting text into another script.

Example:

```text
ಬೆಂಗಳೂರು
        │
        ▼
Bengaluru
```

Instead of changing the meaning, the pronunciation remains the same.

### Supported Scripts

* Kannada
* Telugu
* Tamil
* Malayalam
* Hindi
* Marathi
* Bengali
* English

---

# 🌍 Translation Workflow

When users require meaning instead of pronunciation, the application performs translation.

```text
Detected Text
       │
       ▼
Language Detection
       │
       ▼
Translation Engine
       │
       ▼
Selected Language
       │
       ▼
Display Translation
```

This enables visitors from different linguistic backgrounds to understand street signs more easily.

---

# 🔊 Text-to-Speech Workflow

The application includes speech synthesis for accessibility.

```text
Recognized Text
        │
        ▼
Selected Language
        │
        ▼
Speech Engine
        │
        ▼
Audio Output
```

### Benefits

* Hands-free navigation
* Accessibility for visually impaired users
* Correct pronunciation assistance
* Improved usability while driving

---

# 📊 Complete Data Flow

```text
Camera / Gallery
        │
        ▼
Street Sign Image
        │
        ▼
Image Processing
        │
        ▼
OCR Extraction
        │
        ▼
Language Detection
        │
 ┌──────┼─────────────┐
 ▼      ▼             ▼
Translation  Transliteration  Speech
        │      │             │
        └──────┼─────────────┘
               ▼
      User-Friendly Output
```

---

# 🎯 Real-World Applications

## 🏙 Smart Cities

Enable multilingual navigation for residents and visitors.

---

## 🚑 Emergency Services

* Ambulance
* Fire Department
* Police

Quickly understand street names and reach destinations faster.

---

## 🚚 Logistics & Delivery

Assist delivery partners in accurately locating addresses written in unfamiliar scripts.

---

## 🧳 Tourism

Improve the travel experience for domestic and international tourists by making local street signs understandable.

---

## 👨‍👩‍👧 Migrants & New Residents

Help people relocating to a new state navigate cities without needing to learn the local script immediately.

---

## 🏛 Government Infrastructure

Support Digital India and Smart City initiatives by making public infrastructure more inclusive.

---

# 🌟 Key Benefits

### Social Benefits

* Inclusive navigation
* Better accessibility
* Support for visually impaired users
* Reduced language barriers

---

### Economic Benefits

* Increased tourism satisfaction
* Improved delivery efficiency
* Faster emergency response
* Reduced navigation errors

---

### Technological Benefits

* AI-powered OCR
* Intelligent transliteration
* Offline functionality
* Progressive Web Application
* Scalable architecture

---

# 📈 Performance Goals

* High OCR accuracy for printed street signs
* Low response time
* Lightweight application
* Cross-platform compatibility
* Reliable offline support
* Mobile-first performance

---

# ⚠ Challenges

### OCR Accuracy

Street signs may have:

* Low lighting
* Weather damage
* Different fonts
* Shadows
* Graffiti

### Language Detection

Some Indian scripts share similar visual characteristics, increasing the possibility of incorrect detection.

### Offline Support

Maintaining functionality without internet connectivity while keeping the application lightweight.

---

# 💡 Proposed Improvements

* Enhanced image preprocessing
* AI-based script identification
* Deep learning OCR models
* User-assisted correction for detected text
* Expanded language support
* Better offline language resources

---

# 🔬 Research & References

The project is inspired by current research in OCR and Indic language processing, including:

* **MATra: A Multilingual Attentive Transliteration System for Indian Scripts (2022)** – Transformer-based transliteration for Indic languages.
* **Towards Deployable OCR Models for Indic Languages (2022)** – OCR recognition for multiple Indian languages using the Mozhi dataset.
* **Smart Multilingual Sign Boards (2022)** – Recognition of street signs with multilingual conversion and speech output.

---

# 🏆 Smart India Hackathon 2025

### Theme

Heritage and Culture

### Category

Software

### Problem Statement

**PS ID: 25155**

**Transliterations Tool for Street Signs**

The project addresses multilingual accessibility for navigation by combining OCR, transliteration, translation, and speech synthesis into a single intelligent application.

---

# 🚀 Future Enhancements

* AI-powered script detection
* Real-time camera recognition
* Augmented Reality overlays
* GPS integration
* Offline AI OCR models
* Voice-controlled navigation
* Cloud synchronization
* Route guidance integration
* Additional international language support
* Android and iOS applications

---

# 🛣️ Project Roadmap

* ✅ OCR-based street sign recognition
* ✅ Multilingual transliteration
* ✅ Language translation
* ✅ Text-to-Speech
* ✅ Offline support
* 🔄 AI-enhanced OCR
* 🔄 AR navigation
* 🔄 GPS integration
* 🔄 Mobile application
* 🔄 Cloud services

---

# 💼 Potential Users

* Tourists
* Students
* Migrants
* Delivery Partners
* Government Agencies
* Smart City Authorities
* Emergency Services
* Public Transport Users

---

# 🌍 Vision

To create an intelligent, inclusive, and accessible navigation platform that removes language barriers, making public infrastructure understandable and usable for everyone, regardless of their linguistic background.
