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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const bot_1 = __importDefault(require("./bot"));
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const keys_1 = require("./config/keys");
const app = (0, express_1.default)();
app
    .use((0, cors_1.default)())
    .use(express_1.default.json())
    .use(express_1.default.urlencoded({ extended: false }))
    .use(express_1.default.static(path_1.default.join(__dirname, '..', 'upload')))
    .use('/api', routes_1.default);
app.use(express_1.default.static(path_1.default.join(__dirname, '..', '..', 'client', 'dist')));
app.get('*', (_, res) => __awaiter(void 0, void 0, void 0, function* () { return res.sendFile(path_1.default.join(__dirname, '..', '..', 'client', 'dist', 'index.html')); }))
    .listen(keys_1.PORT, () => {
    bot_1.default.start();
    console.log('Server started...');
});
