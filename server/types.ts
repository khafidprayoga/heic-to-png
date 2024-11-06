import { KeyringPair$Json } from '@polkadot/keyring/types';

export interface WalletCredentials{
    encoded:string;
    encoding:{
        content: string[];
        type: string[];
        version: string;
    }
    address: string;
    meta: any;
    secret: string;
    credsFileLocation: string;
}

export interface InitServerData {
    keyring: KeyringPair$Json,
    creds: WalletCredentials
}