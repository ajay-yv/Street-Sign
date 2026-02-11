/**
 * Main Application Logic for LipiSetu
 */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const video = document.getElementById('cameraFeed');
    const imagePreview = document.getElementById('imagePreview');
    const placeholderContent = document.getElementById('placeholderContent');
    const cameraBtn = document.getElementById('cameraBtn');
    const uploadBtn = document.getElementById('uploadBtn');
    const captureBtn = document.getElementById('captureBtn');
    const closeCameraBtn = document.getElementById('closeCameraBtn');
    const fileInput = document.getElementById('fileInput');
    const processBtn = document.getElementById('processBtn');

    // Selectors
    const sourceSelect = document.getElementById('sourceScript');
    const targetSelect = document.getElementById('targetScript');
    const swapLangBtn = document.getElementById('swapLangBtn');

    // Outputs
    const resultsSection = document.getElementById('resultsSection');
    const originalTextOutput = document.getElementById('originalText');
    const transliteratedTextOutput = document.getElementById('transliteratedText');
    const loadingOverlay = document.getElementById('loadingOverlay');
    const loadingText = document.getElementById('loadingText');

    // State
    let stream = null;
    let currentImageBlob = null;

    // --- Camera Handling ---

    cameraBtn.addEventListener('click', async () => {
        try {
            stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' }
            });

            video.srcObject = stream;
            video.classList.remove('hidden');
            placeholderContent.classList.add('hidden');
            imagePreview.classList.add('hidden');

            captureBtn.classList.remove('hidden');
            closeCameraBtn.classList.remove('hidden');

            resultsSection.classList.add('hidden');
        } catch (err) {
            console.error("Error accessing camera:", err);
            handleCameraError(err);
        }
    });

    closeCameraBtn.addEventListener('click', stopCamera);

    function stopCamera() {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            stream = null;
        }

        // Stop accumulation
        isLiveScanning = false;
        if (scanInterval) {
            clearInterval(scanInterval);
            scanInterval = null;
        }

        video.classList.add('hidden');
        if (arOverlay) arOverlay.classList.add('hidden'); // Hide AR
        captureBtn.classList.add('hidden');
        closeCameraBtn.classList.add('hidden');
        const vc = document.getElementById('videoControls');
        if (vc) vc.classList.add('hidden');

        // Hide loading if it was stuck
        showLoading(false);

        // If we have an image, show it, otherwise show placeholder
        if (currentImageBlob) {
            imagePreview.classList.remove('hidden');
        } else {
            placeholderContent.classList.remove('hidden');
        }
    }

    function handleCameraError(err) {
        // Graceful Fallback: Don't annoy user with alerts.
        // 1. Show descriptive toast
        showToast("⚠️ Camera blocked. Switching to Upload Mode.");

        // 2. Stop any active streams
        stopCamera();

        // 3. Update UI to show we are in fallback mode
        placeholderContent.innerHTML = `
            <div class="error-state">
                <i class="fas fa-camera-slash"></i>
                <p>Camera access denied</p>
                <button class="btn primary-btn" id="fallbackUploadBtn">Take Photo / Upload</button>
            </div>
        `;
        placeholderContent.classList.remove('hidden');

        // 4. Attach listener to new button
        document.getElementById('fallbackUploadBtn').addEventListener('click', () => fileInput.click());
    }

    // --- Live Scan Handling ---
    let isLiveScanning = false;
    let scanInterval = null;
    const liveScanBtn = document.getElementById('liveScanBtn');

    // Create a canvas for processing frames without showing them
    const processingCanvas = document.createElement('canvas');
    const processingCtx = processingCanvas.getContext('2d', { willReadFrequently: true });

    liveScanBtn.addEventListener('click', async () => {
        try {
            stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' }
            });

            video.srcObject = stream;
            video.classList.remove('hidden');
            placeholderContent.classList.add('hidden');
            imagePreview.classList.add('hidden');

            closeCameraBtn.classList.remove('hidden');
            resultsSection.classList.add('hidden');

            // Show new video controls
            const vidControls = document.getElementById('videoControls');
            if (vidControls) vidControls.classList.remove('hidden');

            isLiveScanning = true;
            isPaused = false;
            updatePauseBtnUI();

            startLiveScanLoop();

            showLoading(true, "Live Mode: Point at text...");

        } catch (err) {
            console.error("Error accessing camera:", err);
            handleCameraError(err);
        }
    });

    // --- Pause & Stop Logic ---
    let isPaused = false;
    const pauseBtn = document.getElementById('pauseBtn');
    const stopScanBtn = document.getElementById('stopScanBtn');

    if (pauseBtn) {
        pauseBtn.addEventListener('click', () => {
            isPaused = !isPaused;
            if (isPaused) {
                video.pause(); // Freeze frame
            } else {
                video.play(); // Resume stream
            }
            updatePauseBtnUI();
        });
    }

    if (stopScanBtn) {
        stopScanBtn.addEventListener('click', stopCamera);
    }

    function updatePauseBtnUI() {
        if (!pauseBtn) return;
        const icon = pauseBtn.querySelector('span');
        const text = pauseBtn.querySelector('span:last-child');
        if (isPaused) {
            icon.textContent = 'play_arrow';
            text.textContent = 'Resume';
            pauseBtn.style.color = '#00ffcc';
        } else {
            icon.textContent = 'pause';
            text.textContent = 'Pause';
            pauseBtn.style.color = 'white';
        }
    }

    // AR Overlay Elements
    const arOverlay = document.getElementById('arOverlay');
    const arCtx = arOverlay.getContext('2d');

    // Cyberpunk Mode Toggle
    let isCyberpunk = false;
    const cyberpunkBtn = document.getElementById('cyberpunkBtn');
    if (cyberpunkBtn) {
        cyberpunkBtn.addEventListener('click', () => {
            isCyberpunk = !isCyberpunk;
            document.body.classList.toggle('cyberpunk-mode');
            showToast(isCyberpunk ? "Cyberpunk Mode: ON" : "Cyberpunk Mode: OFF");
        });
    }

    // --- City Scavenger (Gamification) ---
    const questOverlay = document.getElementById('questOverlay');
    const questTargetElem = document.getElementById('questTarget');
    const questProgressElem = document.getElementById('questProgress');

    let currentQuest = { target: 'Stop', count: 0, goal: 3 };

    function updateQuestUI() {
        if (!questOverlay) return;
        questOverlay.classList.remove('hidden');
        questTargetElem.textContent = `${currentQuest.count}/${currentQuest.goal} "${currentQuest.target}" Signs`;
        const pct = (currentQuest.count / currentQuest.goal) * 100;
        questProgressElem.style.width = `${pct}%`;
    }

    function checkQuest(text) {
        if (!text) return;
        if (text.toLowerCase().includes(currentQuest.target.toLowerCase())) {
            // Simple debounce/check to avoid spamming
            if (!questOverlay.classList.contains('celebrating')) {
                questOverlay.classList.add('celebrating'); // Mark as just processed
                currentQuest.count++;
                updateQuestUI();
                showToast(`Quest Update: Found ${currentQuest.target}!`);

                if (currentQuest.count >= currentQuest.goal) {
                    alert("🏆 QUEST COMPLETE! You are a sign master.");
                    currentQuest.count = 0; // Reset or Next Level
                    currentQuest.target = "School"; // Next level
                    updateQuestUI();
                }

                setTimeout(() => questOverlay.classList.remove('celebrating'), 5000);
            }
        }
    }

    // Initialize Quest
    updateQuestUI();


    function startLiveScanLoop() {
        if (scanInterval) clearInterval(scanInterval);

        // Scan every 2 seconds roughly
        scanInterval = setInterval(async () => {
            if (!isLiveScanning || !stream || video.videoWidth === 0) return;
            if (isPaused) return; // Skip OCR if paused

            // Match overlay size to video display size
            arOverlay.width = video.videoWidth;
            arOverlay.height = video.videoHeight;
            arOverlay.classList.remove('hidden');

            try {
                // Capture frame to processing canvas
                processingCanvas.width = video.videoWidth;
                processingCanvas.height = video.videoHeight;
                processingCtx.drawImage(video, 0, 0);

                // Get blob
                processingCanvas.toBlob(async (blob) => {
                    if (!blob) return;

                    loadingText.textContent = "Scanning...";

                    try {
                        // Request full result (words + bbox)
                        const result = await performOCR(blob, true, true); // true=silent, true=fullData

                        // Clear previous AR drawing
                        arCtx.clearRect(0, 0, arOverlay.width, arOverlay.height);

                        if (result && result.text && result.text.trim().length > 0) {

                            lastOCRResult = result; // Store for AR interactions (Lipi Learn)

                            // 1. Update text panel (optional, but good fallback)
                            originalTextOutput.textContent = result.text;

                            // 4. Check AI Context
                            checkAIContext(result.text);

                            // 5. Check Quest
                            checkQuest(result.text);

                            // 5. Check Quest
                            checkQuest(result.text);

                            // 6. Geo-Lipi Map (Record Location) - Debounce this?
                            // For live scan, we don't want to spam markers. 
                            // Only record if text is significantly different or every X seconds?
                            // For simplicity, let's just log it if it's a "Quest" target or "Hazard"
                            // Or maybe just let the user manually capture for map?
                            // Let's stick to recording ONLY on manual "Capture" or "Process" for now to avoid spam.
                            // But for "innovative", let's record UNIQUE texts.
                            const isNewText = !savedLocations.some(l => l.text === result.text && Math.abs(new Date(l.date) - new Date()) < 60000); // 1 min debounce for same text
                            if (isNewText && result.text.length > 3) {
                                // recordLocation(result.text); // Disabled for Live Mode to prevent spam, only enable for Snapshot/Process
                            }


                            // --- Safety Shield (Hazard AR) ---
                            const hazardKeywords = ['stop', 'danger', 'warning', 'caution', 'risk', 'voltage', 'no entry'];
                            const isHazard = hazardKeywords.some(k => result.text.toLowerCase().includes(k));

                            if (isHazard) {
                                document.body.classList.add('hazard-active');
                                if ("vibrate" in navigator) navigator.vibrate(200); // Haptic feedback
                            } else {
                                document.body.classList.remove('hazard-active');
                            }

                            // Auto-detect for transliteration
                            let sourceScript = sourceSelect.value;
                            if (sourceScript === 'auto') sourceScript = detectScript(result.text);
                            const targetScript = targetSelect.value;

                            // --- Sonic Guide (Spatial Audio) ---
                            // Play a blip sound paned to the location of the *first* word
                            if (result.words && result.words.length > 0) {
                                const word = result.words[0];
                                const centerX = word.bbox.x0 + (word.bbox.x1 - word.bbox.x0) / 2;
                                // Normalize 0 to Width -> -1 to 1
                                const panVal = (centerX / video.videoWidth) * 2 - 1;
                                playSpatialBlip(panVal);
                            }

                            // 2. Draw AR Overlay
                            if (result.words && result.words.length > 0) {
                                result.words.forEach(word => {
                                    if (word.confidence < 60) return; // Skip low confidence

                                    const bbox = word.bbox;
                                    const text = word.text;

                                    // Transliterate individual word
                                    const transWord = Transliterator.convert(text, sourceScript, targetScript);

                                    // Adaptive AR: Sample colors
                                    const { bgColor, textColor } = getDominantColors(processingCtx, bbox);

                                    // Draw Box
                                    arCtx.fillStyle = isHazard ? 'rgba(255, 0, 0, 0.6)' :
                                        isCyberpunk ? 'rgba(0, 0, 0, 0.8)' : bgColor; // Adaptive
                                    arCtx.fillRect(bbox.x0, bbox.y0, bbox.x1 - bbox.x0, bbox.y1 - bbox.y0);

                                    // Draw Text
                                    const fontSize = bbox.y1 - bbox.y0;
                                    arCtx.font = `bold ${fontSize}px sans-serif`;

                                    const finalTextColor = isHazard ? '#ff3333' :
                                        isCyberpunk ? '#ff00ff' : textColor;
                                    arCtx.fillStyle = finalTextColor;

                                    arCtx.textAlign = 'center';
                                    arCtx.textBaseline = 'middle'; // Center vertically

                                    const centerX = bbox.x0 + (bbox.x1 - bbox.x0) / 2;
                                    const centerY = bbox.y0 + (bbox.y1 - bbox.y0) / 2;

                                    arCtx.fillText(transWord, centerX, centerY, bbox.x1 - bbox.x0);

                                    // --- Community Tags (Digital Graffiti) ---
                                    const cleanText = text.toLowerCase().trim();
                                    const mockCloudData = {
                                        'stop': 'Bus 505 @ 4PM',
                                        'school': 'Slow Down!',
                                        'library': 'Free Wifi',
                                        'cafe': 'Best Chai ☕',
                                        'temple': 'Shoe Stand ->'
                                    };

                                    if (mockCloudData[cleanText]) {
                                        const note = mockCloudData[cleanText];

                                        // Draw Bubble
                                        const noteX = bbox.x1 + 10;
                                        const noteY = bbox.y0 - 10;

                                        arCtx.save();
                                        arCtx.font = '14px sans-serif';
                                        const width = arCtx.measureText(note).width + 20;

                                        arCtx.fillStyle = 'rgba(255, 255, 255, 0.9)';
                                        arCtx.fillRect(noteX, noteY - 25, width, 30);

                                        // Triangle
                                        arCtx.beginPath();
                                        arCtx.moveTo(noteX, noteY);
                                        arCtx.lineTo(noteX + 10, noteY + 10);
                                        arCtx.lineTo(noteX + 10, noteY - 10);
                                        arCtx.fill();

                                        arCtx.fillStyle = '#333';
                                        arCtx.textAlign = 'left';
                                        arCtx.fillText(note, noteX + 10, noteY - 5);
                                        arCtx.restore();
                                    }

                                    // --- Currency Lens (Price AR) ---
                                    // Simple Regex for ₹ or Rs followed by digits
                                    const priceMatch = text.match(/(?:₹|Rs\.?)\s*(\d+)/i);
                                    if (priceMatch) {
                                        const amountInRupees = parseInt(priceMatch[1]);
                                        const amountInUSD = (amountInRupees * 0.012).toFixed(2); // Mock Rate

                                        const priceX = bbox.x1 + 10;
                                        const priceY = bbox.y1;

                                        arCtx.fillStyle = '#FFD700'; // Gold
                                        arCtx.font = 'bold 16px monospace';
                                        arCtx.fillText(`$${amountInUSD}`, priceX, priceY);
                                    }
                                });
                            }

                            // 3. Full Text Transliteration for Panel
                            const fullTrans = Transliterator.convert(result.text, sourceScript, targetScript);
                            renderInteractiveText(fullTrans, transliteratedTextOutput);

                            resultsSection.classList.remove('hidden');
                            loadingDisplay(false);
                        }
                    } catch (e) {
                        console.log("Live scan frame failed", e);
                    }
                }, 'image/jpeg', 0.6);

            } catch (err) {
                console.error("Live loop error", err);
            }
        }, 2500);
    }


    // Capture Button (Snapshot)
    captureBtn.addEventListener('click', () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0);

        canvas.toBlob(blob => {
            handleImageSelection(blob);
            stopCamera();
        }, 'image/jpeg');
    });

    // --- File Upload Handling ---

    uploadBtn.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files.length > 0) {
            handleImageSelection(e.target.files[0]);
        } else {
            showToast("No image selected (Cancelled)");
        }
    });

    function handleImageSelection(blob) {
        if (!blob) {
            alert("Error: Image data is empty.");
            return;
        }

        showLoading(true, "Optimizing image...");

        // Compress/Resize before processing
        compressImage(blob, 1500).then(compressedBlob => {
            currentImageBlob = compressedBlob;
            const imageUrl = URL.createObjectURL(compressedBlob);

            imagePreview.src = imageUrl;
            imagePreview.classList.remove('hidden');
            placeholderContent.classList.add('hidden');
            video.classList.add('hidden');

            // Enable processing
            processBtn.disabled = false;
            resultsSection.classList.add('hidden');

            showLoading(false);

            // Auto-process for seamless experience (User request)
            showToast("Photo captured! processing...");
            setTimeout(processImage, 500); // Call function directly
        }).catch(err => {
            console.error("Compression failed", err);
            // Fallback to original
            currentImageBlob = blob;
            showLoading(false);
            processImage();
        });
    }

    function compressImage(blob, maxWidth) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = URL.createObjectURL(blob);
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                if (width > maxWidth) {
                    height = Math.round((height * maxWidth) / width);
                    width = maxWidth;
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                canvas.toBlob((newBlob) => {
                    resolve(newBlob);
                }, 'image/jpeg', 0.8); // 80% quality
            };
            img.onerror = reject;
        });
    }

    // --- Text Processing (OCR & Transliteration) ---

    // Extracted function for better control
    async function processImage() {
        if (!currentImageBlob) {
            showToast("⚠️ No image to process");
            return;
        }

        showLoading(true, "Scanning text...");

        try {
            // 1. Perform OCR
            const text = await performOCR(currentImageBlob);

            if (!text || text.trim().length === 0) {
                alert("No text detected in this image.\nTry moving closer or better lighting.");
                showLoading(false);
                return;
            }

            originalTextOutput.textContent = text;

            // Check AI Context
            checkAIContext(text);

            // 1b. Check Quest (City Scavenger)
            checkQuest(text);

            // 1c. Safety Shield (Hazard AR)
            const hazardKeywords = ['stop', 'danger', 'warning', 'caution', 'risk', 'voltage', 'no entry'];
            const isHazard = hazardKeywords.some(k => text.toLowerCase().includes(k));

            if (isHazard) {
                document.body.classList.add('hazard-active');
                if ("vibrate" in navigator) navigator.vibrate(200);
            } else {
                document.body.classList.remove('hazard-active');
            }

            // 1e. Geo-Lipi Map (Record Location)
            recordLocation(text);

            // 1d. Sonic Guide (Spatial Audio) - Center pan for static image
            if (text.length > 0) playSpatialBlip(0);

            // 2. Auto-detect script if selected (simple heuristic or use OCR language hint)
            let sourceScript = sourceSelect.value;
            if (sourceScript === 'auto') {
                sourceScript = detectScript(text);
                sourceSelect.value = sourceScript;
            }

            // 3. Transliterate
            showLoading(true, "Translating script...");
            const targetScript = targetSelect.value;
            const result = Transliterator.convert(text, sourceScript, targetScript);

            // Make words interactive for Smart Dictionary
            // transliteratedTextOutput.textContent = result; 
            renderInteractiveText(result, transliteratedTextOutput);

            // Show results

            // Show results
            resultsSection.classList.remove('hidden');

            // Scroll to results
            resultsSection.scrollIntoView({ behavior: 'smooth' });

        } catch (error) {
            console.error("Processing failed:", error);
            alert(`Processing Failed: ${error.message || "Unknown error"}`);
        } finally {
            showLoading(false);
        }
    }

    processBtn.addEventListener('click', processImage);

    // Map UI values to Tesseract language codes
    function getTesseractLang(scriptValue) {
        const map = {
            'devanagari': 'hin+mar+san',
            'bengali': 'ben',
            'gujarati': 'guj',
            'gurmukhi': 'pan',
            'kannada': 'kan',
            'malayalam': 'mal',
            'oriya': 'ori',
            'tamil': 'tam',
            'telugu': 'tel',
            // Loading all languages is too heavy (~100MB+), so for auto we default 
            // to Hindi + English as they are most common on signs.
            // Users should select specific script for best results.
            'auto': 'hin+eng'
        };
        return map[scriptValue] || 'eng';
    }

    // --- Optimized OCR with Persistent Worker ---
    let ocrWorker = null;
    let currentWorkerLang = null;

    async function getWorker(lang) {
        if (!ocrWorker) {
            ocrWorker = await Tesseract.createWorker(lang, 1, {
                logger: m => {
                    if (m.status === 'recognizing text') {
                        loadingText.textContent = `Scanning... ${Math.round(m.progress * 100)}%`;
                    }
                }
            });
            currentWorkerLang = lang;
        } else if (currentWorkerLang !== lang) {
            // Re-initialize if language changes significantly
            await ocrWorker.terminate();
            ocrWorker = await Tesseract.createWorker(lang, 1, {
                logger: m => {
                    if (m.status === 'recognizing text') {
                        loadingText.textContent = `Scanning... ${Math.round(m.progress * 100)}%`;
                    }
                }
            });
            currentWorkerLang = lang;
        }
        return ocrWorker;
    }

    async function performOCR(imageBlob, silent = false, returnFullData = false) {
        const lang = getTesseractLang(sourceSelect.value);

        try {
            if (window.location.protocol === 'file:' && !silent) {
                console.warn("Running from file:// protocol. Tesseract worker might fail.");
            }

            const worker = await getWorker(lang);

            // Recognize
            const ret = await worker.recognize(imageBlob);

            // Do NOT terminate worker here. Keep it alive.

            if (returnFullData) {
                return ret.data;
            }
            return ret.data.text;
        } catch (err) {
            console.error("Tesseract Error:", err);
            // If worker crashed, nullify it so we create new one next time
            ocrWorker = null;

            if (window.location.protocol === 'file:' && !silent) {
                alert("OCR failed. Please run on localhost.");
            }
            if (silent) return null;
            throw err;
        }
    }

    // Simple Unicode range detection for Indian scripts
    function detectScript(text) {
        // Sample ranges
        if (/[\u0900-\u097F]/.test(text)) return 'devanagari'; // Hindi
        if (/[\u0980-\u09FF]/.test(text)) return 'bengali';
        if (/[\u0A00-\u0A7F]/.test(text)) return 'gurmukhi';
        if (/[\u0A80-\u0AFF]/.test(text)) return 'gujarati';
        if (/[\u0B00-\u0B7F]/.test(text)) return 'oriya';
        if (/[\u0B80-\u0BFF]/.test(text)) return 'tamil';
        if (/[\u0C00-\u0C7F]/.test(text)) return 'telugu';
        if (/[\u0C80-\u0CFF]/.test(text)) return 'kannada';
        if (/[\u0D00-\u0D7F]/.test(text)) return 'malayalam';

        return 'devanagari'; // Default fallback
    }

    // --- Utilities ---

    function showLoading(show, text = "") {
        if (show) {
            loadingText.textContent = text;
            loadingOverlay.classList.remove('hidden');
        } else {
            loadingOverlay.classList.add('hidden');
        }
    }
    const loadingDisplay = showLoading;

    // Swap Languages
    swapLangBtn.addEventListener('click', () => {
        const src = sourceSelect.value;
        const tgt = targetSelect.value;

        // Can't swap if auto or iast (as we don't support OCRing Roman to Indic well in this demo without more logic)
        // But for UI we can just swap handles
        if (src !== 'auto' && tgt !== 'iast') {
            sourceSelect.value = tgt;
            targetSelect.value = src;
        }
    });

    // Copy and Speech
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.dataset.target;
            const text = document.getElementById(targetId).textContent;
            navigator.clipboard.writeText(text);
            // Could add toast here
        });
    });

    document.querySelectorAll('.speak-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.dataset.target;
            const text = document.getElementById(targetId).textContent;
            const utterance = new SpeechSynthesisUtterance(text);
            // Attempt to set voice/lang based on detected script could be added
            speechSynthesis.speak(utterance);
        });
    });

    // --- PWA Install Handling ---
    let deferredPrompt;
    const installBtn = document.getElementById('installBtn');

    window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault();
        // Stash the event so it can be triggered later.
        deferredPrompt = e;
        // Update UI to notify the user they can add to home screen
        if (installBtn) {
            installBtn.classList.remove('hidden');
        }
    });

    if (installBtn) {
        installBtn.addEventListener('click', (e) => {
            // Hide our user interface that shows our A2HS button
            installBtn.classList.add('hidden');
            // Show the prompt
            if (deferredPrompt) {
                deferredPrompt.prompt();
                // Wait for the user to respond to the prompt
                deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('User accepted the A2HS prompt');
                    } else {
                        console.log('User dismissed the A2HS prompt');
                    }
                    deferredPrompt = null;
                });
            }
        });
    }

    // --- Voice Command Handling (2026 Feature) ---
    const voiceCmdBtn = document.getElementById('voiceCmdBtn');
    let recognition;

    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        recognition.continuous = false; // Single command mode
        recognition.lang = 'en-US';
        recognition.interimResults = false;

        recognition.onstart = () => {
            if (voiceCmdBtn) {
                voiceCmdBtn.classList.add('listening');
                voiceCmdBtn.innerHTML = '<i class="fas fa-microphone-alt"></i> Listening...';
            }
        };

        recognition.onend = () => {
            if (voiceCmdBtn) {
                voiceCmdBtn.classList.remove('listening');
                voiceCmdBtn.innerHTML = '<i class="fas fa-microphone"></i> Voice';
            }
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript.toLowerCase();
            console.log("Voice Command:", transcript);
            processVoiceCommand(transcript);
        };

        if (voiceCmdBtn) {
            voiceCmdBtn.addEventListener('click', () => {
                try {
                    recognition.start();
                } catch (e) {
                    console.log("Recognition already started");
                }
            });
        }
    } else {
        if (voiceCmdBtn) voiceCmdBtn.style.display = 'none'; // Hide if not supported
        console.warn("Speech Recognition API not supported in this browser.");
    }

    function processVoiceCommand(command) {
        // Simple command parser
        if (command.includes('scan') || command.includes('start') || command.includes('lipi')) {
            // "Lipi Scan", "Start Scan"
            if (!isLiveScanning) liveScanBtn.click();
            showToast("Voice: Starting Live Scan...");
        }
        else if (command.includes('stop') || command.includes('close')) {
            // "Stop", "Close camera"
            stopCamera();
            showToast("Voice: Stopping Camera...");
        }
        else if (command.includes('translate to')) {
            // "Translate to Hindi", "Translate to Tamil"
            const langMap = {
                'hindi': 'devanagari',
                'marathi': 'devanagari',
                'sanskrit': 'devanagari',
                'bengali': 'bengali',
                'bangla': 'bengali',
                'punjabi': 'gurmukhi',
                'gurmukhi': 'gurmukhi',
                'gujarati': 'gujarati',
                'oriya': 'oriya',
                'odia': 'oriya',
                'tamil': 'tamil',
                'telugu': 'telugu',
                'kannada': 'kannada',
                'malayalam': 'malayalam',
                'english': 'iast'
            };

            const w = command.split('translate to ')[1];
            if (w) {
                const target = langMap[w.trim()];
                if (target) {
                    targetSelect.value = target;
                    showToast(`Voice: Target set to ${w}`);
                }
            }
        }
    }

    // --- AI Insight Logic (2026 Feature) ---
    const aiContextCard = document.getElementById('aiContextCard');
    const aiContent = document.getElementById('aiContent');
    const closeAiCard = document.getElementById('closeAiCard');

    if (closeAiCard) {
        closeAiCard.addEventListener('click', () => {
            aiContextCard.classList.add('hidden');
        });
    }

    // --- Geo-Lipi Map (2026 Feature) ---
    const mapSection = document.getElementById('mapSection');
    const closeMapBtn = document.getElementById('closeMapBtn');
    // Add a toggle button dynamically to the header or use an existing one if available.
    // For now, let's create a Map Toggle in the header
    const header = document.querySelector('.app-header');
    const mapToggle = document.createElement('button');
    mapToggle.className = 'btn-icon-float top-right';
    mapToggle.style.right = '60px'; // Offset from existing top-right buttons if any
    mapToggle.innerHTML = '<span class="material-symbols-rounded">map</span>';
    mapToggle.title = "View Sign Map";
    header.appendChild(mapToggle);

    let map = null;
    let mapMarkers = [];

    // Load markers from local storage
    let savedLocations = JSON.parse(localStorage.getItem('lipiMapLocations')) || [];

    mapToggle.addEventListener('click', () => {
        mapSection.classList.remove('hidden');
        if (!map) {
            initMap();
        } else {
            setTimeout(() => map.invalidateSize(), 300); // Fix rendering issues on show
        }
        // Scroll to map
        mapSection.scrollIntoView({ behavior: 'smooth' });
    });

    if (closeMapBtn) {
        closeMapBtn.addEventListener('click', () => {
            mapSection.classList.add('hidden');
        });
    }

    function initMap() {
        // Default to Center of India or user location
        map = L.map('mapContainer').setView([20.5937, 78.9629], 5);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        // Add saved markers
        savedLocations.forEach(loc => {
            addMarkerToMap(loc.lat, loc.lng, loc.text);
        });

        // Try to get user location for initial centering
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos => {
                map.setView([pos.coords.latitude, pos.coords.longitude], 12);
            }, err => console.log("Location access denied for map center"));
        }
    }

    function addMarkerToMap(lat, lng, text) {
        if (!map) return; // If map not init, we still save data, but don't render yet
        const marker = L.marker([lat, lng]).addTo(map);
        marker.bindPopup(`<b>Found Sign:</b><br>${text}`).openPopup();
        mapMarkers.push(marker);
    }

    function recordLocation(text) {
        if (!navigator.geolocation) return;

        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            // Save to storage
            const newLoc = { lat, lng, text, date: new Date().toISOString() };
            savedLocations.push(newLoc);
            localStorage.setItem('lipiMapLocations', JSON.stringify(savedLocations));

            // Add to map if open or initialized
            if (map) {
                addMarkerToMap(lat, lng, text);
                map.setView([lat, lng], 15); // Focus on new find
            }

            showToast("📍 Location recorded on Geo-Map!");

        }, err => {
            console.log("Could not get location for tag:", err);
        });
    }

    // Hook this into the process flows

    // Mock Knowledge Graph
    const knowledgeBase = {
        'stop': 'Traffic Regulation: Mandatory halt. Proceed only when safe.',
        'caution': 'Warning: Hazardous condition ahead. Reduce speed.',
        'school': 'Zone Alert: School ahead. Drive slowly. Children crossing.',
        'hospital': 'Zone Alert: Hospital nearby. No honking.',
        'varanasi': 'City Insight: Spiritual capital of India, located on the banks of the Ganges.',
        'taj mahal': 'Landmark: UNESCO World Heritage Site in Agra. Built by Shah Jahan.',
        'mumbai': 'City Insight: Financial capital of India. Formerly known as Bombay.',
        'delhi': 'City Insight: Capital territory of India. Historical and political center.',
        'exit': 'Navigation: Way out.',
        'entry': 'Navigation: Entrance point.',
        'restroom': 'Facility: Public toilet / washroom.',
        'temple': 'Place of Worship: Hindu temple. Please check shoe removal rules.',
        'danger': 'CRITICAL: High risk area. Do not enter without authorization.',
        'pharmacy': 'Service: Medical store / Chemist.',
        'police': 'Emergency Service: Law enforcement station.',
        'atm': 'Service: Automated Teller Machine for cash withdrawal.'
    };

    function checkAIContext(text) {
        if (!aiContextCard || !aiContent) return; // Guard clause

        const lowerText = text.toLowerCase();
        let foundContext = null;

        // Simple substring match
        for (const key in knowledgeBase) {
            if (lowerText.includes(key)) {
                foundContext = knowledgeBase[key];
                break; // Show first match
            }
        }

        if (foundContext) {
            aiContent.textContent = foundContext;
            aiContextCard.classList.remove('hidden');

            // Auto-hide after 8 seconds
            setTimeout(() => {
                aiContextCard.classList.add('hidden');
            }, 8000);
        } else {
            aiContextCard.classList.add('hidden');
        }
    }

    // --- Smart Dictionary Logic ---
    const dictionaryCard = document.getElementById('dictionaryCard');
    const dictWordElem = document.getElementById('dictWord');
    const dictMeaningElem = document.getElementById('dictMeaning');
    const dictTypeElem = document.getElementById('dictType');
    const closeDictCard = document.getElementById('closeDictCard');

    if (closeDictCard) {
        closeDictCard.addEventListener('click', () => {
            dictionaryCard.classList.add('hidden');
        });
    }

    function renderInteractiveText(text, container) {
        container.innerHTML = '';
        const words = text.split(/(\s+)/); // Split keeping whitespace

        words.forEach(word => {
            if (word.trim().length === 0) {
                container.appendChild(document.createTextNode(word));
                return;
            }

            const cleanWord = word.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");

            // Check if word is in dictionary
            let dictMatch = null;
            if (typeof streetDictionary !== 'undefined') {
                if (streetDictionary[cleanWord]) dictMatch = streetDictionary[cleanWord];
                // Check singular/plural variations?
            }

            const span = document.createElement('span');
            span.textContent = word;

            if (dictMatch) {
                span.className = 'interactive-word dict-match';
                span.dataset.word = cleanWord;
                span.addEventListener('click', (e) => {
                    e.stopPropagation();
                    showDictionaryDefinition(cleanWord, dictMatch);
                });
            } else {
                span.className = 'interactive-word';
            }

            container.appendChild(span);
        });
    }

    function showDictionaryDefinition(word, data) {
        dictWordElem.textContent = word.charAt(0).toUpperCase() + word.slice(1);
        dictMeaningElem.textContent = data.meaning;
        dictTypeElem.textContent = data.type;

        // Icon
        const iconSpan = document.createElement('span');
        iconSpan.className = 'material-symbols-rounded';
        iconSpan.style.verticalAlign = 'middle';
        iconSpan.style.marginRight = '5px';
        iconSpan.textContent = data.icon || 'info';

        dictWordElem.prepend(iconSpan);

        dictionaryCard.classList.remove('hidden');
    }

    // --- Lipi Learn (Tutor Mode) Logic ---
    const tutorModal = document.getElementById('tutorModal');
    const closeTutor = document.getElementById('closeTutor');
    const tutorWordElem = document.getElementById('tutorWord');
    const charListElem = document.getElementById('charList');

    if (closeTutor) {
        closeTutor.addEventListener('click', () => {
            tutorModal.classList.add('hidden');
        });
    }

    // Interactive AR: Handle taps on the overlay
    arOverlay.addEventListener('click', (e) => {
        if (!lastOCRResult || !lastOCRResult.words) return;

        // Get tap coordinates relative to canvas
        const rect = arOverlay.getBoundingClientRect();
        const scaleX = arOverlay.width / rect.width;
        const scaleY = arOverlay.height / rect.height;

        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;

        // Check intersection with any word bbox
        const clickedWord = lastOCRResult.words.find(w => {
            const b = w.bbox;
            return x >= b.x0 && x <= b.x1 && y >= b.y0 && y <= b.y1;
        });

        if (clickedWord) {
            openTutorMode(clickedWord.text);
        }
    });

    let lastOCRResult = null; // Store latest result for hit testing

    function openTutorMode(word) {
        tutorWordElem.textContent = word;
        charListElem.innerHTML = '';
        tutorModal.classList.remove('hidden');

        // Simulated Character Breakdown (Demo)
        // In a real app, this would use a linguistic library to split syllabically
        const chars = word.split('');

        chars.forEach(char => {
            const card = document.createElement('div');
            card.className = 'char-card';

            // Mock phonetic mapping
            const phonetic = getMockPhonetic(char);

            card.innerHTML = `
                <div class="char-main">${char}</div>
                <div class="char-sound">${phonetic}</div>
            `;
            charListElem.appendChild(card);
        });
    }

    function getMockPhonetic(char) {
        // Simple mock map for demo purposes
        const map = {
            'न': 'na', 'म': 'ma', 'स्': 's', 'ते': 'te',
            'S': 's', 'T': 't', 'O': 'o', 'P': 'p',
            'अ': 'a', 'आ': 'aa', 'क': 'ka', 'ख': 'kha'
        };
        return map[char] || '?';
    }

    function showToast(msg) {
        const oldText = loadingText.textContent;
        loadingText.textContent = msg;
        loadingOverlay.classList.remove('hidden');
        setTimeout(() => {
            loadingOverlay.classList.add('hidden');
            loadingText.textContent = oldText;
        }, 1500);
    }
});
