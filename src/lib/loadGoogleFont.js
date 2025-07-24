export function loadGoogleFont(fontName) {
    const formatted = fontName.replace(/\s+/g, '+');
    const url = `https://fonts.googleapis.com/css2?family=${formatted}:wght@400;600;700&display=swap`;

    // Prevent re-injecting the same font
    if (!document.head.querySelector(`link[href="${url}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        document.head.appendChild(link);
    }
}
