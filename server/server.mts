import express from 'express';
import path from 'path';
import fs from 'fs/promises';
import { createWriteStream } from 'fs';
import compression from 'compression';
import { initServer } from './init';
import { convertHEICtoPNG } from './image';
import { initStorageClient } from './client';

import { File, FileUri } from "@cere-ddc-sdk/ddc-client";

// init express app
const app = express();
const PORT: string | 3000 = process.env.PORT || 3000;

// Serve static files from the dist directory
const __dirname: string = path.resolve(path.dirname(''));
app.use(express.static(path.join(__dirname, 'dist/')));

// init server
// - read wallet credentials and parse secret from args
const config = await initServer(__dirname);
const clientInstance = await initStorageClient(config.keyring, config.creds, config.env)


// Middleware to compress responses
app.use(compression());

// Create directories for uploads and compressed files
const uploadDir = path.join(__dirname, 'uploads');
const compressedDir = path.join(__dirname, 'compressed');

await fs.mkdir(uploadDir, { recursive: true });
await fs.mkdir(compressedDir, { recursive: true });

// Handle file uploads at /upload
app.post('/upload', express.raw({ type: 'application/octet-stream', limit: '5mb' }), async (req: any, res: any) => {
  try {
    let fileName = req.headers['file-name']; // Expecting the file name from the client
    if (!fileName) {
      return res.status(400).send('No file name provided.');
    }

    // check extensions
    const fileExt = path.extname(fileName).toLowerCase();
    if (fileExt != ".heic") {
      return res.status(400).send('Must be heic file.');
    }

    fileName = `${+new Date()}-${fileName}`
    const uploadedFilePath = path.join(uploadDir, fileName);
    const writeStream = createWriteStream(uploadedFilePath);

    // Pipe the raw buffer data to a file
    writeStream.write(req.body);
    writeStream.end();

    writeStream.on('finish', async () => {

      // prepare convert and set output path
      const pngOutputPath: string = path.format({
        dir: compressedDir,
        name: path.basename(uploadedFilePath, fileExt),
        ext: '.png',
      })


      // compressing
      try {
        const compressed: Boolean = await convertHEICtoPNG(uploadedFilePath, pngOutputPath)
        if (!compressed) {
          return res.status(500).send('error at convert heic to png');
        }

        // readFile
        const fileBuffer = await fs.readFile(pngOutputPath)
        const image: File = new File(fileBuffer, {
          size: fileBuffer.byteLength
        });

        // ping
        clientInstance.connect()
        const result: FileUri = await clientInstance.store(BigInt(config.env.CERE_BUCKET_ID), image)

        console.log(result)
        // send response data back to frontend
        return res.json({
          message: 'File uploaded successfully!',
          filePath: pngOutputPath,
          cid: result.cid,
          url: "https://ipfsio.ioasdas/asdsad/a",
        });

      } catch (e) {
        return res.status(500).send(`error ${e}`);
      }

    });

    writeStream.on('error', (err) => {
      return res.status(500).send('File upload failed.');
    });
  } catch (error) {
    return res.status(500).send('Server error during file upload.');
  }
});

// Catch-all route for serving the main app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
