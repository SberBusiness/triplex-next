export interface IKnitTexture {
    relief: string;
    height: string;
    overlay: string;
}

/** One repeat of stockinette: overlapping legs, a dark valley, and individual yarn fibres. */
export function createKnitTexture(): IKnitTexture {
    const canvas = document.createElement("canvas");
    canvas.width = 96;
    canvas.height = 128;
    const context = canvas.getContext("2d");
    if (!context) return { relief: "", height: "", overlay: "" };

    context.fillStyle = "rgb(100, 100, 100)";
    context.fillRect(0, 0, 96, 128);
    context.lineCap = "round";

    for (let row = -1; row < 2; row++) {
        for (let column = -1; column < 2; column++) {
            for (const direction of [-1, 1]) {
                const drawLeg = (offset: number) => {
                    context.beginPath();
                    context.moveTo(column * 96 + 48 + direction * 28 + offset, row * 128 - 13);
                    context.bezierCurveTo(
                        column * 96 + 48 + direction * 46 + offset,
                        row * 128 + 42,
                        column * 96 + 48 + direction * 19 + offset,
                        row * 128 + 75,
                        column * 96 + 48 + direction * 3 + offset,
                        row * 128 + 124,
                    );
                    context.stroke();
                };

                for (let width = 32; width >= 2; width -= 2) {
                    const brightness = Math.round(115 + 120 * Math.sqrt(1 - (width / 34) ** 2));
                    context.strokeStyle = `rgb(${brightness}, ${brightness}, ${brightness})`;
                    context.lineWidth = width;
                    drawLeg(-2);
                }
                for (let fibre = -12; fibre <= 12; fibre += 4) {
                    context.strokeStyle = fibre % 8 === 0 ? "rgba(30,30,30,0.18)" : "rgba(255,255,255,0.25)";
                    context.lineWidth = 1.2;
                    drawLeg(fibre);
                }
            }
        }
    }

    const relief = canvas.toDataURL();
    const height = context.getImageData(0, 0, 96, 128);
    const lighting = context.createImageData(96, 128);
    const sample = (x: number, y: number) => height.data[(((y + 128) % 128) * 96 + ((x + 96) % 96)) * 4] / 255;
    for (let y = 0; y < 128; y++) {
        for (let x = 0; x < 96; x++) {
            const index = (y * 96 + x) * 4;
            // Flat areas are transparent; only opposite sides of the yarn receive a highlight or shadow.
            const slope = (sample(x - 3, y) - sample(x + 3, y)) * 0.7 + (sample(x, y - 3) - sample(x, y + 3)) * 0.9;
            const color = slope > 0 ? 255 : 0;
            lighting.data[index] = color;
            lighting.data[index + 1] = color;
            lighting.data[index + 2] = color;
            lighting.data[index + 3] = Math.round(Math.min(Math.abs(slope) * 1.4, 0.5) * 255);
        }
    }
    context.putImageData(lighting, 0, 0);
    const overlay = canvas.toDataURL();
    for (let index = 0; index < height.data.length; index += 4) {
        height.data[index + 3] = height.data[index];
        height.data[index] = 255;
        height.data[index + 1] = 255;
        height.data[index + 2] = 255;
    }
    context.putImageData(height, 0, 0);
    return { relief, height: canvas.toDataURL(), overlay };
}
