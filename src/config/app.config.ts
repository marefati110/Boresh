import * as dotenv from 'dotenv';

dotenv.config();

// server
export const PORT = +process.env.PORT || 3000;

// redis

export const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
export const REDIS_PORT = +process.env.REDIS_PORT || 6379;

// mongo

// app
export const DEFAULT_SITE = process.env.DEFAULT_SITE;
