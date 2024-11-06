import { WalletCredentials } from "./types";
import { DdcClient, JsonSigner } from "@cere-ddc-sdk/ddc-client";
import { KeyringPair$Json } from '@polkadot/keyring/types';

export function initStorageClient(walletKeyring: KeyringPair$Json, creds: WalletCredentials) {
    return new Promise(async (resolve, reject) => {

        try {
            const jsonSigner = new JsonSigner(walletKeyring, { passphrase: creds.secret });
            const signature = await jsonSigner.sign('data');

            console.log(signature);
        } catch (error) {
            console.error('Error initializing storage client', error);
            reject(error);
        }
    });
}
