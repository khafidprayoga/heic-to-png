import express from 'express';
import localtunnel from "localtunnel"
import path from 'path';
import fs from 'fs/promises';
import { createWriteStream } from 'fs';
import compression from 'compression';
import { initServer } from './init';
import { convertHEICtoPNG } from './image';
import { initStorageClient } from './client';
import { config as loadEnvCfg } from "dotenv"
import { File, FileUri } from '@cere-ddc-sdk/ddc-client';
import { RunnerMode } from './types';

loadEnvCfg()

/**
 * WARNING: This subdomain is NOT secure and should not be used in production.
 * Anyone can simply overwrite it with their own project and hijack requests
 * This is simply for testing purposes. If you need a secure way to host your
 * project, please reach out to us.
 */
const LOCALTUNNEL_SUBDOMAIN = "8abc625d-abdd-4638-8016-582a9a492f24"; // This is the subdomain where your webserver will be available. Eg. https://example.processor-proxy.sook.ch
const LOCALTUNNEL_HOST = "https://processor-proxy.sook.ch/";
const LOCAL_PORT = 3000;


// init express app
const app = express();
const PORT: number= 3000;

// Serve static files from the dist directory
const __dirname: string = path.resolve(path.dirname(''));

// init server
// - read wallet credentials and parse secret from args
const config = await initServer(__dirname);
const clientInstance = await initStorageClient(config);

const storagePath = global._STD_.job.storageDir;

if (config.envType == RunnerMode.LocalDevelopment){
  app.use(express.static(path.join(storagePath, '../dist/')));
}

// Middleware to compress responses
app.use(compression());

// Create directories for uploads and compressed files
const uploadDir = path.join(storagePath, 'uploads');
const compressedDir = path.join(storagePath, 'compressed');


// on local create temp dir
if (config.envType == RunnerMode.LocalDevelopment){
  await fs.mkdir(uploadDir, { recursive: true });
  await fs.mkdir(compressedDir, { recursive: true });
}

const processedImages = new Map<string, string>();

// Handle file uploads at /upload
app.post(
  '/upload',
  express.raw({ type: 'application/octet-stream', limit: '5mb' }),
  async (req: any, res: any) => {
    try {
      let fileName = req.headers['file-name']; // Expecting the file name from the client
      if (!fileName) {
        return res.status(400).send('No file name provided.');
      }

      // check extensions
      const fileExt = path.extname(fileName).toLowerCase();
      if (fileExt != '.heic') {
        return res.status(400).send('Must be heic file.');
      }

      fileName = `${+new Date()}-${fileName}`;
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
        });

        // compressing
        try {
          const compressed: Boolean = await convertHEICtoPNG(
            uploadedFilePath,
            pngOutputPath,
          );
          if (!compressed) {
            return res.status(500).send('error at convert heic to png');
          }

          // readFile
          const fileBuffer = await fs.readFile(pngOutputPath);
          const image: File = new File(fileBuffer, {
            size: fileBuffer.byteLength,
          });

          // ping
          clientInstance.connect();

          // upload
          const result: FileUri = await clientInstance.store(
            BigInt(config.env.CERE_BUCKET_ID!),
            image,
          );
          console.log(
            `new content with CID ${result.cid} stored in bucket ${result.bucketId}`,
          );

          // flush the internal server storage (uploaded and converted files)
          await fs.rm(uploadedFilePath);
          await fs.rm(pngOutputPath);

          const urlImg = `https://cdn.dragon.cere.network/${result.bucketId}/${result.cid}`
          processedImages.set(result.cid, urlImg);

          // send response data back to frontend
          return res.json({
            message: 'File uploaded successfully!',
            filePath: result.name,
            cid: result.cid,
            url: urlImg,
            jobId: global._STD_.job.getId(),
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
  },
);


// Catch-all route for serving the main app
app.get('*', (req, res) => {
  if (config.envType === RunnerMode.LocalDevelopment) {
    res.sendFile(path.join(storagePath, '../dist/', 'index.html'));
  }

  // if production build redirect to static web on render
  return res.redirect(301, "https://cere.khafidprayoga.my.id");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const startTunnel = async () => {
  const tunnel = await localtunnel({
    subdomain: LOCALTUNNEL_SUBDOMAIN,
    host: LOCALTUNNEL_HOST,
    port: LOCAL_PORT,
  });

  console.log("Tunnel started at", tunnel.url);
};

startTunnel();