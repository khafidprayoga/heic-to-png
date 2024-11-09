import fs from 'fs/promises';
import convert from 'heic-convert';

export function convertHEICtoPNG(
  originalFilePath: string,
  outputFilePath: string,
): Promise<boolean> {
  return new Promise(async (resolve, reject) => {
    if (!originalFilePath) {
      reject('No file path provided');
    }

    try {
      const fileBuffer = await fs.readFile(originalFilePath);
      const converted = await convert({
        buffer: fileBuffer,
        format: 'PNG',
        quality: 1,
      });

      const outputBuffer = Buffer.from(converted);

      // save file
      await fs.writeFile(outputFilePath, outputBuffer);
    } catch (e) {
      reject(e);
    }

    resolve(true);
  });
}
