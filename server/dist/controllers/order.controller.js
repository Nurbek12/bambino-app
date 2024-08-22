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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.updateStatusOrder = exports.createOrder = exports.getOrder = exports.getMyOrders = exports.getOrdersForDeliver = exports.getAllOrders = void 0;
const prisma_1 = require("../config/prisma");
const statistic_controller_1 = require("./statistic.controller");
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const where = {};
        const orderBy = req.query.sorting || {};
        const page = Number((_a = req.query) === null || _a === void 0 ? void 0 : _a.page) || 1;
        const limit = Number((_b = req.query) === null || _b === void 0 ? void 0 : _b.limit) || 20;
        const status = req.query.status || '';
        if (status)
            where.status = status;
        const [count, orders] = yield Promise.all([
            prisma_1.prisma.order.count({ where }),
            prisma_1.prisma.order.findMany({
                where,
                orderBy,
                skip: (page - 1) * limit,
                take: limit,
                include: {
                    user: {
                        select: {
                            id: true,
                            first_name: true,
                            last_name: true,
                        }
                    }
                }
            })
        ]);
        return res.status(200).json({ data: orders, count });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'error', message: 'Interlan server error.' });
    }
});
exports.getAllOrders = getAllOrders;
const getOrdersForDeliver = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);
        const orders = yield prisma_1.prisma.order.findMany({
            where: { created_at: { gte: startOfDay, lte: endOfDay, } },
            include: {
                user: {
                    select: {
                        id: true,
                        first_name: true,
                        last_name: true,
                        address: true,
                        geolocation: true,
                        phone: true,
                    }
                }
            }
        });
        return res.status(200).json({ data: orders });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'error', message: 'Interlan server error.' });
    }
});
exports.getOrdersForDeliver = getOrdersForDeliver;
const getMyOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const where = { user_id: +req.params.id };
        const orderBy = req.query.sorting || { created_at: 'desc' };
        const page = Number((_a = req.query) === null || _a === void 0 ? void 0 : _a.page) || 1;
        const limit = Number((_b = req.query) === null || _b === void 0 ? void 0 : _b.limit) || 20;
        const status = ((_c = req.query) === null || _c === void 0 ? void 0 : _c.status) || '';
        if (status)
            where.status = status;
        const [count, orders] = yield Promise.all([
            prisma_1.prisma.order.count({ where }),
            prisma_1.prisma.order.findMany({
                where,
                orderBy,
                skip: (page - 1) * limit,
                take: limit
            })
        ]);
        return res.status(200).json({ data: orders, count });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'error', message: 'Interlan server error.' });
    }
});
exports.getMyOrders = getMyOrders;
const getOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield prisma_1.prisma.order.findFirst({
            where: { id: +req.params.id },
            include: {
                user: {
                    select: {
                        id: true,
                        phone: true,
                        address: true,
                        last_name: true,
                        first_name: true,
                    }
                },
                order_items: {
                    select: {
                        id: true,
                        quantity: true,
                        product: {
                            select: {
                                id: true,
                                name: true,
                                price: true,
                                discount: true,
                                category_id: true,
                                images: {
                                    select: {
                                        url: true
                                    },
                                    take: 1
                                }
                            }
                        }
                    }
                }
            }
        });
        return res.status(200).json({ data: order });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'error', message: 'Interlan server error.' });
    }
});
exports.getOrder = getOrder;
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order_items = [];
        const _a = req.body, { body_order_items } = _a, order_data = __rest(_a, ["body_order_items"]);
        const order = yield prisma_1.prisma.order.create({ data: order_data });
        yield prisma_1.prisma.user.update({ where: { id: order.user_id }, data: { count_of_orders: { increment: 1 } } });
        yield Promise.all(body_order_items.map((oi) => __awaiter(void 0, void 0, void 0, function* () {
            yield prisma_1.prisma.product.update({ where: { id: oi.product_id }, data: { sold: { increment: 1 }, stock_count: { decrement: oi.quantity } } });
            const new_order_item = yield prisma_1.prisma.orderItem.create({
                data: {
                    quantity: oi.quantity,
                    order_id: order.id,
                    product_id: oi.product_id,
                }
            });
            order_items.push(new_order_item);
        })));
        (0, statistic_controller_1.setStatistics)('orders', 1);
        return res.status(200).json({ data: Object.assign(Object.assign({}, order), { order_items }) });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'error', message: 'Interlan server error.' });
    }
});
exports.createOrder = createOrder;
const updateStatusOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield prisma_1.prisma.order.update({
            where: { id: +req.params.id },
            data: { status: req.body.status },
        });
        if (order.status === 'finish')
            (0, statistic_controller_1.setStatistics)('amount', order.total);
        return res.status(200).json({ data: true });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'error', message: 'Interlan server error.' });
    }
});
exports.updateStatusOrder = updateStatusOrder;
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma_1.prisma.orderItem.deleteMany({ where: { order_id: +req.params.id } });
        yield prisma_1.prisma.order.delete({ where: { id: +req.params.id } });
        return res.status(200).json({ data: true });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'error', message: 'Interlan server error.' });
    }
});
exports.deleteOrder = deleteOrder;
