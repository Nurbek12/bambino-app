import cors from 'cors'
import { join } from 'path'
import express from 'express'
import routes from './routes'

const app = express()

app
    .use(cors())
    .use(express.json())
    .use(express.urlencoded())
    .use(routes)
// app.use(express.static(join(__dirname, '..', '..', 'client', 'dist')))

// app.get('*', async (req, res) => res.sendFile(join(__dirname, '..', '..', 'client', 'dist', 'index.html')))

    .listen(4000)

// import { config } from 'dotenv'
// import { Bot, GrammyError, HttpError, InlineKeyboard, Keyboard } from 'grammy'

// config()

// const bot = new Bot(process.env.TOKEN!)

// bot.command('start', async c => {
//     await c.react("👍")
// })

// const menuKey = new InlineKeyboard()
//     .text('Узнать статус заказа', 'order-status')
//     .text('Обратиться в поддержку', 'support')


// const backKey = new InlineKeyboard()
//     .text('< Назад к меню', 'back')

// bot.command('menu', async c => {
//     await c.reply('Выберите пунтк меню', {
//         reply_markup: menuKey
//     })
// })

// bot.callbackQuery('order-status', async c => {
//     await c.editMessageText('Статус заказа: в пути', {
//         reply_markup: backKey
//     })
//     await c.answerCallbackQuery()
// })

// bot.callbackQuery('support', async c => {
//     await c.editMessageText('Напишите Ваш запрос', {
//         reply_markup: backKey
//     })
//     await c.answerCallbackQuery()
// })

// bot.callbackQuery('back', async c => {
//     await c.editMessageText('Выберите пунтк меню', {
//         reply_markup: menuKey
//     })
//     await c.answerCallbackQuery()
// })

// bot.catch((err) => {
//     if(err.error instanceof GrammyError) console.log('Error in request')
//     else if(err.error instanceof HttpError) console.log('Could not contact Telegram')
//     else console.log('Unknown error')
// })

// bot.start()