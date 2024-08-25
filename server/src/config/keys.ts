import { config } from 'dotenv'

config()

export const PORT = process.env.PORT

export const JWT_SECRET = process.env.JWT_SECRET

export const BOT_TOKEN = process.env.TOKEN

export const WEB_APP_URL = process.env.WEB_APP_URL

export const IMAGEKIT_PUBLIC_KEY = process.env.IMAGEKIT_PUBLIC_KEY
export const IMAGEKIT_PRIVATE_KEY = process.env.IMAGEKIT_PRIVATE_KEY
export const IMAGEKIT_ENDPOINT_URL = process.env.IMAGEKIT_ENDPOINT_URL
