export default function isSupportFontDisplay() {
    return 'fontDisplay' in document.body.style;
}