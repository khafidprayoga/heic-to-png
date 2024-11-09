import type { InitServerData } from './types';
import { DdcClient, JsonSigner, MAINNET } from '@cere-ddc-sdk/ddc-client';

export function initStorageClient(
  initializer: InitServerData
): Promise<DdcClient> {
  return new Promise(async (resolve, reject) => {
    try {
      const jsonSigner = new JsonSigner(JSON.parse(initializer.env.WALLET_CREDS!), {
        passphrase: initializer.env.CERE_PASSPHRASE!,
      });
      
      const signOK = await jsonSigner.isReady();
      const message = `Signer is ready: ${signOK} with address: ${jsonSigner.address}`;
      console.debug(message);

      const client = await DdcClient.create(jsonSigner, MAINNET);
      const bucket = await client.getBucket(BigInt(initializer.env.CERE_BUCKET_ID!));
      resolve(client);
    } catch (error) {
      console.error('Error initializing storage client', error);
      reject(error);
    }
  });
}
