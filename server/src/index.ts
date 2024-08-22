import cors from 'cors'
import path from 'path'
import bot from './bot'
import express from 'express'
import routes from './routes'
import { PORT } from './config/keys'

const app = express()


app
    .use(cors())
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use(express.static(path.join(__dirname, '..', 'upload')))
    .use('/api', routes)
   
    app.use(express.static(path.join(__dirname, '..', '..', 'client', 'dist')))

    app.get('*', async (_, res) => res.sendFile(path.join(__dirname, '..', '..', 'client', 'dist', 'index.html')))

    .listen(PORT, () => {
        bot.start()
        console.log('Server started...')
    })
