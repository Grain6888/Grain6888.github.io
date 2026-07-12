// assets/favicon.js
function loadFavicons() {
    const faviconImages = document.querySelectorAll("img.favicon");

    faviconImages.forEach(img => {
        const rawUrl = img.getAttribute("data-domain");

        if (!rawUrl) {
            img.style.display = "none";
            return;
        }

        let hostname = "";

        try {
            const urlObj = new URL(rawUrl);
            hostname = urlObj.hostname;
        } catch (e) {
            img.style.display = "none";
            return;
        }

        const faviconUrl = `https://www.google.com/s2/favicons?domain=${hostname}&sz=32`;

        img.src = faviconUrl;

        img.onerror = () => {
            img.style.display = "none";
        };
    });
}
