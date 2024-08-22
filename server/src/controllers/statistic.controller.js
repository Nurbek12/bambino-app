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
exports.setStatistics = exports.getStatisticsCounts = void 0;
const prisma_1 = require("../config/prisma");
const getStatisticsCounts = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [users_count, orders_count, reports_count, products_count,] = yield Promise.all([
            prisma_1.prisma.user.count(),
            prisma_1.prisma.order.count(),
            prisma_1.prisma.report.count({ where: { status: 'pending' } }),
            prisma_1.prisma.product.count(),
        ]);
        return res.status(200).json({ data: {
                users_count,
                orders_count,
                reports_count,
                products_count,
            } });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'error', message: 'Interlan server error.' });
    }
});
exports.getStatisticsCounts = getStatisticsCounts;
const setStatistics = (key, value) => __awaiter(void 0, void 0, void 0, function* () {
    const d = new Date();
    const date = d.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' }).replace(/\//g, '-');
    const s = yield prisma_1.prisma.statistics.findUnique({ where: { date } });
    if (s) {
        yield prisma_1.prisma.statistics.update({ where: { id: s.id }, data: { [key]: { increment: value } } });
    }
    else {
        const newStatistic = {
            date,
            day: d.getDate(),
            month: d.getMonth() + 1,
            year: d.getFullYear(),
            amount: 0,
            orders: 0,
            users: 0,
            reports: 0
        };
        newStatistic[key] = value;
        yield prisma_1.prisma.statistics.create({ data: newStatistic });
    }
});
exports.setStatistics = setStatistics;
// setStatistics()
