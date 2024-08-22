"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WEB_APP_URL = exports.BOT_TOKEN = exports.JWT_SECRET = exports.PORT = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.PORT = process.env.PORT;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.BOT_TOKEN = process.env.TOKEN;
exports.WEB_APP_URL = process.env.WEB_APP_URL;
