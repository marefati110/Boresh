import * as dotenv from 'dotenv';

dotenv.config();

export const PORT = +process.env.PORT || 3000;

export const DEFAULT_SITE = process.env.DEFAULT_SITE;
