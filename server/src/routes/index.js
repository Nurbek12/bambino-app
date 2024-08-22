"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = __importDefault(require("./auth.route"));
const user_route_1 = __importDefault(require("./user.route"));
const order_route_1 = __importDefault(require("./order.route"));
const report_route_1 = __importDefault(require("./report.route"));
const review_route_1 = __importDefault(require("./review.route"));
const product_route_1 = __importDefault(require("./product.route"));
const category_route_1 = __importDefault(require("./category.route"));
const statistic_router_1 = __importDefault(require("./statistic.router"));
exports.default = (0, express_1.Router)()
    .use('/auth', auth_route_1.default)
    .use('/users', user_route_1.default)
    .use('/orders', order_route_1.default)
    .use('/reports', report_route_1.default)
    .use('/reviews', review_route_1.default)
    .use('/products', product_route_1.default)
    .use('/categories', category_route_1.default)
    .use('/statistics', statistic_router_1.default);
