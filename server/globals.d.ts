// globals.d.ts
export {};

declare global {
  interface Job {
    getId: () => string;
    storageDir: string;
  }

  
  var _STD_: {
    job: Job;
    env: {};
  };
}
