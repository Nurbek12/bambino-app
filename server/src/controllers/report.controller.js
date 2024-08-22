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
exports.deleteReport = exports.updateReport = exports.createReport = exports.getAllReports = void 0;
const prisma_1 = require("../config/prisma");
const statistic_controller_1 = require("./statistic.controller");
const getAllReports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const where = {};
        const orderBy = req.query.sorting || {};
        const page = Number((_a = req.query) === null || _a === void 0 ? void 0 : _a.page) || 1;
        const limit = Number((_b = req.query) === null || _b === void 0 ? void 0 : _b.limit) || 20;
        const [count, reviews] = yield Promise.all([
            prisma_1.prisma.report.count({ where }),
            prisma_1.prisma.report.findMany({
                where,
                orderBy,
                skip: (page - 1) * limit,
                take: limit,
                include: {
                    user: {
                        select: {
                            last_name: true,
                            first_name: true,
                        }
                    },
                }
            })
        ]);
        return res.status(200).json({ data: reviews, count });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'error', message: 'Interlan server error.' });
    }
});
exports.getAllReports = getAllReports;
const createReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const report = yield prisma_1.prisma.report.create({
            data: req.body,
            include: {
                user: {
                    select: {
                        first_name: true,
                        last_name: true,
                    }
                }
            }
        });
        yield prisma_1.prisma.order.update({
            where: { id: report.order_id },
            data: { is_reported: true }
        });
        (0, statistic_controller_1.setStatistics)('reports', 1);
        return res.status(200).json({ data: report });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'error', message: 'Interlan server error.' });
    }
});
exports.createReport = createReport;
const updateReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const report = yield prisma_1.prisma.report.update({ where: { id: +req.params.id }, data: req.body });
        return res.status(200).json({ data: report });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'error', message: 'Interlan server error.' });
    }
});
exports.updateReport = updateReport;
const deleteReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma_1.prisma.report.delete({ where: { id: +req.params.id } });
        return res.status(200).json({ data: true });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'error', message: 'Interlan server error.' });
    }
});
exports.deleteReport = deleteReport;
