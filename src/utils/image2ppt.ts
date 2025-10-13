import PptxGenJS from "pptxgenjs";

/**
 * Converts an array of image Files into a PowerPoint file (PPTX)
 * @param files Array of image files selected by user
 * @param outputFileName The desired PPTX file name
 * @param onProgress Optional callback called after each image is added: (completed, total) => void
 */
export async function imagesToPPTX(
  files: File[],
  outputFileName: string = "presentation.pptx",
  onProgress?: (completed: number, total: number) => void
): Promise<void> {
  if (!files.length) throw new Error("No images provided");

  const pptx = new PptxGenJS();
  const total = files.length;

  for (let i = 0; i < total; i++) {
    const file = files[i];
    const slide = pptx.addSlide();
    const imageData = await readFileAsDataURL(file);
    const img = await loadImage(imageData);

    const maxWidth = 10; // in inches
    const slideHeight = maxWidth * (img.height / img.width);

    pptx.defineLayout({ name: "custom", width: maxWidth, height: slideHeight });
    pptx.layout = "custom";

    const imageOptions = {
      data: imageData,
      x: 0,
      y: 0,
      w: maxWidth,
      h: slideHeight,
    };

    slide.addImage(imageOptions);

    // Report progress
    if (onProgress) onProgress(i + 1, total);
  }

  await pptx.writeFile({ fileName: outputFileName });
}

async function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
