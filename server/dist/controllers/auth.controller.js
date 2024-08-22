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
exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = require("../config/prisma");
const keys_1 = require("../config/keys");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma_1.prisma.admin.findFirst({ where: { login: req.body.login } });
        if (!user)
            return res.status(400).json({ message: 'Не правильный логин или пароль' });
        if (!(yield bcryptjs_1.default.compare(req.body.password, user.password)))
            return res.status(400).json({ message: 'Не правильный логин или пароль' });
        const token = jsonwebtoken_1.default.sign(user.id.toString(), keys_1.JWT_SECRET, { expiresIn: '2h' });
        return res.status(200).json({ data: token });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'error', message: 'Interlan server error.' });
    }
});
exports.login = login;
const createAdmin = (login, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma_1.prisma.admin.create({ data: {
                login: login,
                password: yield bcryptjs_1.default.hash(password, 10)
            } });
        console.log("Админ создан!");
    }
    catch (error) {
        console.log(error);
    }
});
