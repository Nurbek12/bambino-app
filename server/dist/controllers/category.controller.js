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
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getAllCategories = void 0;
const prisma_1 = require("../config/prisma");
const getAllCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const where = {};
        const orderBy = req.query.sorting || {};
        const page = Number((_a = req.query) === null || _a === void 0 ? void 0 : _a.page) || 1;
        const limit = Number((_b = req.query) === null || _b === void 0 ? void 0 : _b.limit) || 20;
        const search = req.query.search || '';
        if (search)
            Object.assign(where, {
                name: {
                    contains: search
                },
            });
        const [count, categories] = yield Promise.all([
            prisma_1.prisma.category.count({ where }),
            prisma_1.prisma.category.findMany({
                where,
                orderBy,
                skip: (page - 1) * limit,
                take: limit,
            })
        ]);
        return res.status(200).json({ data: categories, count });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'error', message: 'Interlan server error.' });
    }
});
exports.getAllCategories = getAllCategories;
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.file)
            req.body.image = req.file.filename;
        const category = yield prisma_1.prisma.category.create({ data: req.body });
        return res.status(200).json({ data: category });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'error', message: 'Interlan server error.' });
    }
});
exports.createCategory = createCategory;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.file)
            req.body.image = req.file.filename;
        const category = yield prisma_1.prisma.category.update({ where: { id: +req.params.id }, data: req.body });
        return res.status(200).json({ data: category });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'error', message: 'Interlan server error.' });
    }
});
exports.updateCategory = updateCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma_1.prisma.category.delete({ where: { id: +req.params.id } });
        return res.status(200).json({ data: true });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'error', message: 'Interlan server error.' });
    }
});
exports.deleteCategory = deleteCategory;
