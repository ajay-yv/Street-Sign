/**
 * Transliteration Engine using Sanscript.js
 * Handles conversion between different Indian scripts
 */

const Transliterator = {
    // Mapping from our UI values to Sanscript scheme names
    scriptMap: {
        'devanagari': 'devanagari',
        'bengali': 'bengali',
        'gujarati': 'gujarati',
        'gurmukhi': 'gurmukhi',
        'kannada': 'kannada',
        'malayalam': 'malayalam',
        'oriya': 'oriya',
        'tamil': 'tamil',
        'telugu': 'telugu',
        'iast': 'iast' // Roman/English transliteration
    },

    /**
     * Transliterate text from source script to target script
     * @param {string} text - The text to transliterate
     * @param {string} sourceScript - Source script code (ui value)
     * @param {string} targetScript - Target script code (ui value)
     * @returns {string} - Transliterated text
     */
    convert: function(text, sourceScript, targetScript) {
        if (!text) return '';
        if (sourceScript === targetScript) return text;

        try {
            // Check if Sanscript is loaded
            if (typeof Sanscript === 'undefined') {
                console.error('Sanscript library not loaded');
                return 'Error: Transliteration library not loaded.';
            }

            const src = this.scriptMap[sourceScript];
            const dest = this.scriptMap[targetScript];

            if (!src || !dest) {
                console.error('Invalid script code:', sourceScript, targetScript);
                return text;
            }

            // Perform transliteration
            return Sanscript.t(text, src, dest);

        } catch (error) {
            console.error('Transliteration error:', error);
            return text; // Return original text on error
        }
    },

    /**
     * Get display name for a script key
     */
    getScriptName: function(key) {
        const names = {
            'devanagari': 'Devanagari',
            'bengali': 'Bengali',
            'gujarati': 'Gujarati',
            'gurmukhi': 'Gurmukhi',
            'kannada': 'Kannada',
            'malayalam': 'Malayalam',
            'oriya': 'Odia',
            'tamil': 'Tamil',
            'telugu': 'Telugu',
            'iast': 'English (Roman)'
        };
        return names[key] || key;
    }
};
