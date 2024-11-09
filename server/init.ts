import path from 'path';
import fs from 'fs/promises';
import { InitServerData, WalletCredentials, Environ } from './types';

// initServer function to read wallet credentials and parse secret from args
export async function initServer(dirname: string): Promise<InitServerData> {
  const environ: Environ = {
    WALLET_CREDS: process.env.WALLET_CREDS || '',
    CERE_BUCKET_ID: Number(process.env.CERE_BUCKET_ID) || 0,
    CERE_CLUSTER_ID: process.env.CERE_CLUSTER_ID || '',
    CERE_FOLDER: process.env.CERE_FOLDER || '',
    CERE_SECRET: process.env.CERE_SECRET || '',
  };

  // parsing the wallet.jsoon file and reading the content
  const credsFile = process.env.WALLET_CREDS;
  if (!credsFile) {
    throw new Error('WALLET_CREDS environment variable is not defined');
  }

  const walletCreds = path.join(dirname, credsFile);
  const data = await fs.readFile(walletCreds, 'utf-8');
  const walletData: WalletCredentials = JSON.parse(data);

  // read secret
  // example `bun run server/server.mts yourpasswordsecret
  if (environ.CERE_SECRET = '') {
    throw new Error('Wallet secret key is not provided on env');
  }

  // set secret key from flag args to typed object
  walletData.secret = environ.CERE_SECRET;
  walletData.credsFileLocation = walletCreds;

  const result: InitServerData = {
    creds: walletData,
    keyring: data,
    env: environ,
  };

  return result;
}
