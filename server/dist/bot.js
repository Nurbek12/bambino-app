"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("./config/prisma");
const keys_1 = require("./config/keys");
const statistic_controller_1 = require("./controllers/statistic.controller");
const grammy_1 = require("grammy");
const bot = new grammy_1.Bot(keys_1.BOT_TOKEN);
bot.command('start', (c) => __awaiter(void 0, void 0, void 0, function* () {
    yield c.reply('Добро пожаловать в бот', {
        reply_markup: new grammy_1.InlineKeyboard().text('Использовать приложению', 'use_bot')
    });
}));
bot.callbackQuery('use_bot', (c) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield prisma_1.prisma.user.findFirst({ where: { user_id: (_a = c.chat) === null || _a === void 0 ? void 0 : _a.id } });
    if (user === null)
        yield c.reply('У вас нет аккоунта', {
            reply_markup: new grammy_1.InlineKeyboard().text('Создать аккоунт', 'create_user')
        });
    yield c.reply('Вы можете использовать приложению', {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: "Открыть магазин",
                        web_app: {
                            url: keys_1.WEB_APP_URL
                        }
                    }
                ]
            ],
            resize_keyboard: true
        }
    });
    yield c.answerCallbackQuery();
}));
bot.callbackQuery('create_user', (c) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        let user;
        user = yield prisma_1.prisma.user.findFirst({ where: { user_id: (_a = c.chat) === null || _a === void 0 ? void 0 : _a.id } });
        if (user)
            return yield c.reply('У вас уже есть аккоунт. Вы можете использовать приложению', {
                reply_markup: new grammy_1.Keyboard().webApp('Открыть магазин', keys_1.WEB_APP_URL)
            });
        user = yield prisma_1.prisma.user.create({ data: {
                first_name: (_b = c.chat) === null || _b === void 0 ? void 0 : _b.first_name,
                last_name: ((_c = c.chat) === null || _c === void 0 ? void 0 : _c.last_name) || '',
                user_id: (_d = c.chat) === null || _d === void 0 ? void 0 : _d.id,
                count_of_orders: 0,
                address: "",
                phone: "",
            } });
        (0, statistic_controller_1.setStatistics)('users', 1);
        yield c.reply('Ваш аккоунт создано успешно. Вы можете использовать приложению', {
            reply_markup: new grammy_1.Keyboard().webApp('Открыть магазин', keys_1.WEB_APP_URL)
        });
    }
    catch (error) {
        console.log(error);
    }
    finally {
        yield c.answerCallbackQuery();
    }
}));
bot.catch((err) => {
    console.log(err);
    if (err.error instanceof grammy_1.GrammyError)
        console.log('Error in request');
    else if (err.error instanceof grammy_1.HttpError)
        console.log('Could not contact Telegram');
    else
        console.log('Unknown error');
});
exports.default = bot;
