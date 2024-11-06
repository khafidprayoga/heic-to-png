import path from 'path';
import fs from 'fs/promises';
import { WalletCredentials } from './types';

// initServer function to read wallet credentials and parse secret from args
export async function initServer(dirname: string) : Promise<WalletCredentials> {
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
    const walletSecretKeyArgs = process.argv[2];
    if (!walletSecretKeyArgs) {
        throw new Error('Wallet secret key is not provided');
    }

    // set secret key from flag args to typed object
    walletData.secret =  walletSecretKeyArgs
    return walletData
}