let fontStylesPromise: Promise<string> | undefined;

const FONT_FILES = [
    ["SBSansText", "SBSansText-Regular"],
    ["SBSansTextSemibold", "SBSansText-Semibold"],
    ["SBSansDisplaySemibold", "SBSansDisplay-SemiBold"],
];

const blobToDataUrl = (blob: Blob): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => (typeof reader.result === "string" ? resolve(reader.result) : reject());
        reader.onerror = () => reject(new Error("Не удалось прочитать шрифт"));
        reader.readAsDataURL(blob);
    });

function getFontStyles(): Promise<string> {
    fontStylesPromise ??= Promise.all(
        FONT_FILES.map(async ([family, file]) => {
            const response = await fetch(`/assets/fonts/${file}.woff2`);
            if (!response.ok) throw new Error("Не удалось загрузить шрифт");
            const data = await blobToDataUrl(await response.blob());
            return `@font-face { font-family: '${family}'; src: url('${data}') format('woff2'); }`;
        }),
    ).then((styles) => styles.join("\n"));
    return fontStylesPromise;
}

function copyElement(source: HTMLElement): HTMLElement {
    const clone = document.createElement(source instanceof HTMLInputElement ? "div" : source.tagName);
    const computed = getComputedStyle(source);
    for (const property of computed) {
        // Computed values already resolve tokens. Excluding custom properties keeps snapshots small.
        if (!property.startsWith("--")) clone.style.setProperty(property, computed.getPropertyValue(property));
    }
    clone.style.animation = "none";
    clone.style.transition = "none";

    if (source instanceof HTMLInputElement) {
        clone.textContent = source.value || source.placeholder;
        clone.style.whiteSpace = "pre";
        clone.style.overflow = "hidden";
        // The actual native input is exposed through a transparent canvas cutout while editing.
    } else {
        source.childNodes.forEach((child) => {
            if (child instanceof HTMLElement) clone.appendChild(copyElement(child));
            else if (child.nodeType === Node.TEXT_NODE) clone.appendChild(child.cloneNode());
        });
    }
    return clone;
}

/** Snapshot of this self-contained demo only: computed styles, local fonts, text and form values. */
export async function captureScene(source: HTMLElement): Promise<HTMLImageElement> {
    await document.fonts.ready;
    const fontStyles = await getFontStyles();
    const { width, height } = source.getBoundingClientRect();
    const clone = copyElement(source);
    clone.style.width = `${width}px`;
    clone.style.height = `${height}px`;
    clone.style.margin = "0";
    const fontStyle = document.createElement("style");
    fontStyle.textContent = fontStyles;
    clone.prepend(fontStyle);
    const markup = new XMLSerializer().serializeToString(clone);
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width * ratio}" height="${height * ratio}" viewBox="0 0 ${width} ${height}"><foreignObject width="100%" height="100%">${markup}</foreignObject></svg>`;
    const image = new Image();
    image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
    await image.decode();
    return image;
}
