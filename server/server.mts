import express from 'express';
import path from 'path';
import fs from 'fs/promises';
import { createWriteStream } from 'fs';
import compression from 'compression';
import { initServer } from './init';


// init express app
const app = express();
const PORT: string | 3000 = process.env.PORT || 3000;

// Serve static files from the dist directory
const __dirname:string = path.resolve(path.dirname(''));
app.use(express.static(path.join(__dirname, 'dist/')));


// init server
// - read wallet credentials and parse secret from args
initServer(__dirname);


// Middleware to compress responses
app.use(compression());

// Create directories for uploads and compressed files
const uploadDir = path.join(__dirname, 'uploads');
const compressedDir = path.join(__dirname, 'compressed');

await fs.mkdir(uploadDir, { recursive: true });
await fs.mkdir(compressedDir, { recursive: true });

// Handle file uploads at /upload
app.post('/upload', express.raw({ type: 'application/octet-stream', limit: '5mb' }), async (req, res) => {
  try {
    const fileName = req.headers['file-name']; // Expecting the file name from the client
    if (!fileName) {
      return res.status(400).send('No file name provided.');
    }

    const uploadedFilePath = path.join(uploadDir, fileName);
    const writeStream = createWriteStream(uploadedFilePath);

    // Pipe the raw buffer data to a file
    writeStream.write(req.body);
    writeStream.end();

    writeStream.on('finish', async () => {
      const compressedFilePath = path.join(compressedDir, fileName);

      // Here, you can add code to handle compression if needed
      // For this example, we're just copying the uploaded file
      await fs.copyFile(uploadedFilePath, compressedFilePath);

      res.json({
        message: 'File uploaded successfully!',
        filePath: compressedFilePath,
        cid: '6x0asdsadsad',
        url: "https://ipfsio.ioasdas/asdsad/a"
      });
    });

    writeStream.on('error', (err) => {
      console.error(err);
      res.status(500).send('File upload failed.');
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error during file upload.');
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
