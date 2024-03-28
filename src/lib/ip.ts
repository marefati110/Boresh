import * as geoip from 'geoip-lite';

type IpInfo = {
  range: Array<number>;
  country: string;
  region: string;
  eu: string;
  timezone: string;
  city: string;
  ll: Array<number>;
  metro: number;
  area: number;
};

export function IPLookup(ip: string): IpInfo | null {
  return geoip.lookup(ip);
}
