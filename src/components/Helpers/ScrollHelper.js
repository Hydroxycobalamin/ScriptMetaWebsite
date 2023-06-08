export function ScrollHelper() {
    const anchor = window.location.hash.split("#")[1];
    if (anchor) {
        const anchorEl = document.getElementById(anchor);
        if (anchorEl) {
            anchorEl.scrollIntoView();
        }
    }
}

export default ScrollHelper;
