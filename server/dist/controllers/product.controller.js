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
exports.deleteProduct = exports.updateProduct = exports.removePhoto = exports.addPhotoToProduct = exports.createProduct = exports.getProduct = exports.getAllProducts = void 0;
const prisma_1 = require("../config/prisma");
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        const where = {};
        const orderBy = req.query.sorting || {};
        const category = req.query.category || null;
        const page = Number((_a = req.query) === null || _a === void 0 ? void 0 : _a.page) || 1;
        const limit = Number((_b = req.query) === null || _b === void 0 ? void 0 : _b.limit) || 20;
        const min_price = Number((_c = req.query) === null || _c === void 0 ? void 0 : _c.min_price) || null;
        const max_price = Number((_d = req.query) === null || _d === void 0 ? void 0 : _d.max_price) || null;
        const search = req.query.search || '';
        if (search)
            Object.assign(where, {
                name: {
                    contains: search // TODO: mode: intensive
                },
            });
        if (category !== null)
            Object.assign(where, {
                category_id: {
                    in: [+category]
                }
            });
        if (min_price !== null || max_price !== null) {
            where.price = {};
            if (min_price !== null)
                Object.assign(where.price, { gte: min_price });
            if (max_price !== null)
                Object.assign(where.price, { lte: max_price });
        }
        const [count, products] = yield Promise.all([
            prisma_1.prisma.product.count({ where }),
            prisma_1.prisma.product.findMany({
                where,
                orderBy,
                skip: (page - 1) * limit,
                take: limit,
                include: {
                    images: {
                        select: {
                            id: true,
                            url: true,
                            size: true,
                            name: true,
                        }
                    },
                    category: {
                        select: {
                            id: true,
                            name: true,
                            image: true,
                            parent_id: true,
                        }
                    },
                    reviews: {
                        select: {
                            id: true
                        }
                    }
                }
            })
        ]);
        return res.status(200).json({ data: products, count });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'error', message: 'Interlan server error.' });
    }
});
exports.getAllProducts = getAllProducts;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield prisma_1.prisma.product.findFirst({
            where: { id: +req.params.id },
            include: {
                images: {
                    select: {
                        id: true,
                        url: true,
                        size: true,
                        name: true,
                    }
                },
                category: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                        parent_id: true,
                    }
                },
                reviews: {
                    select: {
                        id: true,
                        rate: true,
                        text: true,
                        created_at: true,
                        user: {
                            select: {
                                first_name: true,
                                last_name: true,
                            }
                        }
                    }
                }
            }
        });
        return res.status(200).json({ data: product });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'error', message: 'Interlan server error.' });
    }
});
exports.getProduct = getProduct;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield prisma_1.prisma.product.create({ data: req.body });
        return res.status(200).json({ data: product });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'error', message: 'Interlan server error.' });
    }
});
exports.createProduct = createProduct;
const addPhotoToProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const images = yield Promise.all(req.files.map((file) => {
            return prisma_1.prisma.image.create({
                data: {
                    size: file.size,
                    url: file.filename,
                    name: file.originalname,
                    product_id: +req.params.id,
                }
            });
        }));
        return res.status(200).json({ data: images });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'error', message: 'Interlan server error.' });
    }
});
exports.addPhotoToProduct = addPhotoToProduct;
const removePhoto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma_1.prisma.image.delete({ where: { id: +req.params.id } });
        return res.status(200).json({ data: true });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'error', message: 'Interlan server error.' });
    }
});
exports.removePhoto = removePhoto;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield prisma_1.prisma.product.update({ where: { id: +req.params.id }, data: req.body });
        return res.status(200).json({ data: product });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'error', message: 'Interlan server error.' });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma_1.prisma.product.delete({ where: { id: +req.params.id } });
        return res.status(200).json({ data: true });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'error', message: 'Interlan server error.' });
    }
});
exports.deleteProduct = deleteProduct;
