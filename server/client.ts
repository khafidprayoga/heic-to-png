import { Environ, WalletCredentials } from "./types";
import { DdcClient, JsonSigner,MAINNET } from "@cere-ddc-sdk/ddc-client";

export function initStorageClient(walletKeyring: string, creds: WalletCredentials, env:Environ) : Promise<DdcClient>{
    return new Promise(async (resolve, reject) => {

        try {
            const jsonSigner = new JsonSigner(JSON.parse(walletKeyring), { passphrase: creds.secret });
            const signOK = await jsonSigner.isReady();
            const message= `Signer is ready: ${signOK} with address: ${jsonSigner.address}`;
            console.debug(message)

            const client = await DdcClient.create(jsonSigner, MAINNET)
            resolve(client);
        } catch (error) {
            console.error('Error initializing storage client', error);
            reject(error);
        }
    });
}
