import UAParser from 'ua-parser-js';

export function ParseUA(ua: string) {
  const result = new UAParser(ua);
  return result.getResult();
}
