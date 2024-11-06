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
}