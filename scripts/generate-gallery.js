import fs from "node:fs";
import path from "path:fs";

// Папка с изображениями, имеющими конфликты.
const differenceDir = ".loki/difference";

const outputDir = ".loki";
const galleryFile = path.join(outputDir, "gallery.html");

const getImagePairs = () => {
    const files = fs.readdirSync(differenceDir);
    return files
        .filter((file) => file.endsWith(".png"))
        .map((file) => {
            return {
                name: file,
                reference: `/reference/${file}`,
                current: `/current/${file}`,
                diff: `/difference/${file}`,
            };
        });
};

const generateGalleryHTML = (pairs) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Loki Gallery</title>
  <style>
    body { font-family: sans-serif; padding: 20px; }
    h1 { font-size: 24px; }
    .image-row { display: flex; margin-bottom: 20px; gap: 10px; }
    .image-box { text-align: center; }
    img { max-width: 300px; border: 1px solid #ccc; }
    .filename { font-size: 14px; margin: 5px 0; }
  </style>
</head>
<body>
  <h1>Loki Visual Regression Gallery</h1>
  ${pairs
      .map(
          (pair) => `
    <div class="image-row">
      <div class="image-box">
        <div class="filename">Reference</div>
        <img src="${pair.reference}" />
      </div>
      <div class="image-box">
        <div class="filename">Current</div>
        <img src="${pair.current}" />
      </div>
      <div class="image-box">
        <div class="filename">Difference: ${pair.name}</div>
        <img src="${pair.diff}" />
      </div>
    </div>
  `,
      )
      .join("")}
</body>
</html>
`;

const run = () => {
    if (!fs.existsSync(differenceDir)) {
        console.log("Нет различий. Папка .loki/difference не найдена.");
        return;
    }

    const pairs = getImagePairs();
    fs.writeFileSync(galleryFile, generateGalleryHTML(pairs));

    console.log(`Галерея создана: ${galleryFile}`);
};

run();
