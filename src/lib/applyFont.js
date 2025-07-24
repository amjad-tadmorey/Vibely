import { loadGoogleFont } from '../lib/loadGoogleFont';

export function applyFont(fontName) {
    const chosenFont = fontName || 'Inter';

    // Load the Google font dynamically
    loadGoogleFont(chosenFont);

    // Apply it to the document body or wherever you want
    document.body.style.fontFamily = `'${chosenFont}', sans-serif`;
}
