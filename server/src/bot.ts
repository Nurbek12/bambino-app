import { prisma } from './config/prisma'
import { BOT_TOKEN } from './config/keys'
import { setStatistics } from './controllers/statistic.controller'
import { Bot, GrammyError, HttpError, InlineKeyboard, Keyboard } from 'grammy'

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
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: "Открыть магазин",
                        web_app: {
                            url: "https://5823a2b8025623.lhr.life",
                        }
                    }
                ]
            ],
            resize_keyboard: true
        }
    })
    await c.answerCallbackQuery()
})

bot.callbackQuery('create_user', async c => {
    try {
        let user;
        user = await prisma.user.findFirst({ where: { user_id: c.chat?.id } })
        if(user) return await c.reply('У вас уже есть аккоунт. Вы можете использовать приложению', {
            reply_markup: new Keyboard().webApp('Открыть магазин', 'https://2e360c0277046e.lhr.life')
        })
        user = await prisma.user.create({data: {
            first_name: c.chat?.first_name!,
            last_name: c.chat?.last_name! || '',
            user_id: c.chat?.id!,
            count_of_orders: 0,
            address: "",
            phone: "",
        }})
        setStatistics('users', 1)
        await c.reply('Ваш аккоунт создано успешно. Вы можете использовать приложению', {
            reply_markup: new Keyboard().webApp('Открыть магазин', 'https://2e360c0277046e.lhr.life')
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

export default bot