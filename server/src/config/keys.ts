import { config } from 'dotenv'

config()

export const PORT = process.env.PORT

export const JWT_SECRET = process.env.JWT_SECRET

export const BOT_TOKEN = process.env.TOKEN