
export const sleep = (ms: number) => new Promise(
  (resolve) => setTimeout(resolve, ms)
);
 
export const id = () => Math.floor(Math.random() * 1_000_000).toString(16);