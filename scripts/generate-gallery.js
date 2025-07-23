import fs from 'fs';
import path from 'path';

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
    h1 { font-size: 24px; margin-bottom: 30px; }
    .gallery-table { 
      width: 100%; 
      border-collapse: collapse; 
      margin-bottom: 20px; 
    }
    .gallery-table th { 
      background-color: #f5f5f5; 
      padding: 15px; 
      text-align: center; 
      font-weight: bold; 
      border: 1px solid #ddd; 
    }
    .gallery-table td { 
      padding: 15px; 
      text-align: center; 
      border: 1px solid #ddd; 
      vertical-align: top; 
    }
    .image-box { 
      text-align: center; 
    }
    img { 
      max-width: 300px; 
      max-height: 200px; 
      border: 1px solid #ccc; 
      border-radius: 4px; 
    }
    .filename { 
      font-size: 14px; 
      margin: 10px 0; 
      font-weight: bold; 
      color: #333; 
    }
    .test-name { 
      font-size: 16px; 
      font-weight: bold; 
      color: #2c3e50; 
      margin-bottom: 10px; 
    }
  </style>
</head>
<body>
  <h1>Loki Visual Regression Gallery</h1>
  <table class="gallery-table">
    <thead>
      <tr>
        <th>Test Name</th>
        <th>Reference</th>
        <th>Current</th>
        <th>Difference</th>
      </tr>
    </thead>
    <tbody>
      ${pairs
		.map(
			(pair) => `
        <tr>
          <td>
            <div class="test-name">${pair.name.replace('.png', '')}</div>
          </td>
          <td>
            <div class="image-box">
              <div class="filename">Reference</div>
              <img src="${pair.reference}" alt="Reference image for ${pair.name}" />
            </div>
          </td>
          <td>
            <div class="image-box">
              <div class="filename">Current</div>
              <img src="${pair.current}" alt="Current image for ${pair.name}" />
            </div>
          </td>
          <td>
            <div class="image-box">
              <div class="filename">Difference</div>
              <img src="${pair.diff}" alt="Difference image for ${pair.name}" />
            </div>
          </td>
        </tr>
      `,
		)
		.join("")}
    </tbody>
  </table>
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
