import type { InitServerData, Environ, } from './types';
import { RunnerMode } from './types';

// initServer function to read wallet credentials and parse secret from args
export async function initServer(dirname: string): Promise<InitServerData> {
  let envMode: RunnerMode = RunnerMode.AcurastNetwork;
  let environ: Environ = {
    WALLET_CREDS: null,
    CERE_BUCKET_ID: null,
    CERE_CLUSTER_ID: null,
    CERE_FOLDER: null,
    CERE_PASSPHRASE: null
  }

  if (typeof _STD_ === "undefined") {
    // If _STD_ is not defined, we know it's not running in the Acurast Cloud.
    // Define _STD_ here for local testing.
    envMode = RunnerMode.LocalDevelopment;

    (global as any)._STD_ = {
      job: { getId: () => "localhost", storageDir: dirname },
    };
    
    environ  = {
      WALLET_CREDS: process.env.WALLET_CREDS || null,
      CERE_BUCKET_ID: Number(process.env.CERE_BUCKET_ID)  || null,
      CERE_CLUSTER_ID: process.env.CERE_CLUSTER_ID  || null,
      CERE_FOLDER: process.env.CERE_FOLDER ||  null,
      CERE_PASSPHRASE: process.env.CERE_PASSPHRASE || null,
    };
  
  }else{
    environ  = {
      WALLET_CREDS:  _STD_.env["WALLET_CREDS"],
      CERE_BUCKET_ID:  Number(_STD_.env["CERE_BUCKET_ID"]) ,
      CERE_CLUSTER_ID:  _STD_.env["CERE_CLUSTER_ID"],
      CERE_FOLDER: _STD_.env["CERE_FOLDER"] ,
      CERE_PASSPHRASE:  _STD_.env["CERE_PASSPHRASE"],
    };
  }


  

  // read secret
  // example `bun run server/server.mts yourpasswordsecret
  if (environ.CERE_PASSPHRASE === null) {
    throw new Error('Wallet secret key is not provided on env');
  }

  const result: InitServerData = {
    env: environ,
    envType: envMode,
  };

  console.log(result.env)
  return result;
}
