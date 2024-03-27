import Hashids from 'hashids';

const hashids = new Hashids('boresh', 1);

export function Encode(ids: number[]): string {
  return hashids.encode(ids);
}

export function Decode(str: string): number {
  return hashids.decode(str).at(0) as number;
}
