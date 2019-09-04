"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = require("../utils/Util");
var CoreServiceHelper_1 = require("./CoreServiceHelper");
var Settings_1 = require("../Settings");
var SalesService = /** @class */ (function () {
    function SalesService() {
        var _this = this;
        this.log = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.log.apply(console, ["[" + _this.env + "] " + Util_1.timeText(Date.now()) + " SalesService#"].concat(args));
        };
    }
    SalesService.prototype.init = function (env) {
        this.env = env;
        return Promise.resolve();
    };
    SalesService.prototype.getOrderList = function () {
        var body = {
            collection: 'Orders',
            filter: {}
        };
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_select, 'application/json', JSON.stringify(body)).then(function (res) {
            var orders = res.result;
            return Promise.resolve(orders);
        });
    };
    ;
    SalesService.prototype.getRetailerList = function () {
        var body = {
            collection: 'Users',
            filter: {
                'role': 'retailer'
            }
        };
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_select, 'application/json', JSON.stringify(body)).then(function (res) {
            var users = res.result;
            return Promise.resolve(users);
        });
    };
    SalesService.prototype.getProductItemList = function (retailerId, categoryId) {
        if (!retailerId || !categoryId) {
            return Promise.reject('blank param error!');
        }
        var body = {
            collection: 'Products',
            filter: { categoryId: categoryId }
        };
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_select_one, 'application/json', JSON.stringify({
            collection: 'Users',
            filter: { '_id': retailerId }
        })).then(function (res) {
            if (res && !res.result) {
                return Promise.reject('retailer not found!');
            }
            var users = res.result;
            if (!users.authorizedCategoryIds) {
                return Promise.resolve([]);
            }
            if (users.authorizedCategoryIds) {
                var keys = Object.keys(users.authorizedCategoryIds);
                if (!keys.find(function (key) { return key === categoryId; })) {
                    return Promise.resolve([]);
                }
            }
            return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_select, 'application/json', JSON.stringify(body)).then(function (res) {
                var products = res.result;
                var returnObjList = [];
                products.forEach(function (product) {
                    var returnObj = {
                        product: {
                            retailers: {}
                        },
                        number: 0,
                        soldNumber: 0,
                        productId: '',
                        retailerId: ''
                    };
                    returnObj.product = product;
                    returnObj.number = product.retailers && product.retailers[retailerId] ? product.retailers[retailerId].number : 0;
                    returnObj.soldNumber = product.retailers && product.retailers[retailerId] ? product.retailers[retailerId].soldNumber : 0;
                    returnObj.productId = product["_id"];
                    returnObj.retailerId = retailerId;
                    delete returnObj.product.retailers;
                    returnObjList.push(returnObj);
                });
                return Promise.resolve(returnObjList);
            });
        });
    };
    SalesService.prototype.getCategoryList = function () {
        var body = {
            collection: 'Categories',
            filter: {}
        };
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_select, 'application/json', JSON.stringify(body)).then(function (res) {
            var categories = res.result;
            return Promise.resolve(categories);
        });
    };
    SalesService.prototype.updateOrderRetailerPrice = function (orderId, retailerId, price) {
        var filter = {};
        filter["_id"] = orderId;
        var data = { status: 'retailerBiding', 'retailers': {
                '_id': retailerId,
                'price': price
            } };
        var body = {
            collection: 'Orders',
            filter: filter,
            data: data
        };
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_update_one, 'application/json', JSON.stringify(body));
    };
    return SalesService;
}());
exports.SalesService = SalesService;
//# sourceMappingURL=SalesService.js.map