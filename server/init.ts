import path from 'path';
import fs from 'fs/promises';
import { KeyringPair$Json } from '@polkadot/keyring/types';
import { InitServerData, WalletCredentials } from './types';

// initServer function to read wallet credentials and parse secret from args
export async function initServer(dirname: string) : Promise<InitServerData> {
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
    walletData.credsFileLocation = walletCreds
    
    const result: InitServerData =  {
        creds: walletData,
        keyring: data as unknown as  KeyringPair$Json,
    }

    return  result
}