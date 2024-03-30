/* eslint-disable @typescript-eslint/no-var-requires */
const Hashids = require('hashids/cjs');

const hashids = new Hashids('boresh', 1);

export function Encode(ids: number[]): string {
  return hashids.encode(ids);
}

export function Decode(str: string): number | null {
  try {
    return hashids.decode(str).at(0) as number;
  } catch {
    return null;
  }
}
