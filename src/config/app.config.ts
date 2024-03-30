import * as dotenv from 'dotenv';

dotenv.config();

export const IsProd = process.env.NODE_ENV === 'production';

// server
export const PORT = +process.env.PORT || 3000;

// redis

export const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
export const REDIS_PORT = +process.env.REDIS_PORT || 6379;

// mongo

// app

export const TITLE = process.env.TITLE;
export const LOGO_URL = process.env.LOGO_URL;

export const NOTFOUND_STRATEGY: '404' | 'redirect' | 'homepage' =
  (process.env.NOTFOUND_STRATEGY as any) || '404';
