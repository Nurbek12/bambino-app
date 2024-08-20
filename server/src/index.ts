import cors from 'cors'
import path from 'path'
import express from 'express'
import routes from './routes'
import { prisma } from './config/prisma'
import { PORT, BOT_TOKEN } from './config/keys'
import { Bot, GrammyError, HttpError, InlineKeyboard } from 'grammy'
// import {} from 

const app = express()
const bot = new Bot(BOT_TOKEN!)

bot.command('start', async c => {
    await c.reply('Добро пожаловать в бот', {
        reply_markup: new InlineKeyboard().text('Использовать приложению', 'use_bot')
    })
})

bot.callbackQuery('use_bot', async c => {
    const user = await prisma.user.findFirst({ where: { user_id: c.chat?.id } })
    if(user === null) await c.reply('У вас нет аккоунта', {
        reply_markup: new InlineKeyboard().text('Создать аккоунт', 'create_user')
    })
    await c.reply('Вы можете использовать приложению', {
        reply_markup: new InlineKeyboard().webApp('Открыть магазин', 'https://74156062fde9be.lhr.life')
    })
    await c.answerCallbackQuery()
})

bot.callbackQuery('create_user', async c => {
    try {
        const user = await prisma.user.create({data: {
            first_name: c.chat?.first_name!,
            last_name: c.chat?.last_name! || '',
            user_id: c.chat?.id!,
            count_of_orders: 0,
            address: "",
            phone: "",
        }})
        await c.reply('Ваш аккоун создано успешно. Вы можете использовать приложению', {
            reply_markup: new InlineKeyboard().webApp('Открыть магазин', 'https://74156062fde9be.lhr.life')
        })
    } catch (error) {
        console.log(error);
    } finally {
        await c.answerCallbackQuery()
    }
})

bot.catch((err) => {
    console.log(err)
    if(err.error instanceof GrammyError) console.log('Error in request')
    else if(err.error instanceof HttpError) console.log('Could not contact Telegram')
    else console.log('Unknown error')
})

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
