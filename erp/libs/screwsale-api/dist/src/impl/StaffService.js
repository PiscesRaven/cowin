"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = require("../utils/Util");
var CoreServiceHelper_1 = require("./CoreServiceHelper");
var Settings_1 = require("../Settings");
var StaffService = (function () {
    function StaffService() {
        var _this = this;
        this.log = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.log.apply(console, ["[" + _this.env + "] " + Util_1.timeText(Date.now()) + " StaffService#"].concat(args));
        };
    }
    StaffService.prototype.init = function (env) {
        this.env = env;
        return Promise.resolve();
    };
    StaffService.prototype.createProduct = function (product) {
        if (!product || !product.retailerId) {
            return Promise.reject("blank params error!");
        }
        product.number = product.number ? product.number : 0;
        product.soldNumber = 0;
        var body = {
            collection: 'Categories',
            data: product
        };
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_insert, 'application/json', JSON.stringify(body));
    };
    StaffService.prototype.createCategory = function (category) {
        if (!category || !category.retailerId) {
            return Promise.reject("blank params error!");
        }
        var body = {
            collection: 'Categories',
            data: category
        };
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_insert, 'application/json', JSON.stringify(body));
    };
    StaffService.prototype.removeProduct = function (productId) {
        if (!productId) {
            return Promise.reject("blank params error!");
        }
        var body = {
            collection: 'Products',
            filter: {
                "_id": productId
            }
        };
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_remove_one, 'application/json', JSON.stringify(body));
    };
    StaffService.prototype.removeCategory = function (categoryId) {
        if (!categoryId) {
            return Promise.reject("blank params error!");
        }
        var body = {
            collection: 'Categories',
            filter: {
                "_id": categoryId
            }
        };
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_remove_one, 'application/json', JSON.stringify(body));
    };
    StaffService.prototype.updateProduct = function (productId, product) {
        if (!productId || product) {
            return Promise.reject("blank params error!");
        }
        delete product["_id"];
        var body = {
            collection: 'Products',
            filter: {
                "_id": productId
            },
            data: product
        };
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_update_one, 'application/json', JSON.stringify(body));
    };
    StaffService.prototype.updateCategory = function (categoryId, category) {
        if (!categoryId || !category) {
            return Promise.reject("blank params error!");
        }
        delete category["_id"];
        var body = {
            collection: 'Categories',
            filter: {
                "_id": categoryId
            },
            data: category
        };
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_update_one, 'application/json', JSON.stringify(body));
    };
    StaffService.prototype.getProductList = function (retailerId) {
        var body = {
            collection: 'Products',
            filter: { retailerId: retailerId }
        };
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_select, 'application/json', JSON.stringify(body)).then(function (res) {
            var products = res.result;
            return Promise.resolve(products);
        });
    };
    StaffService.prototype.getCategoryList = function (retailerId) {
        var body = {
            collection: 'Categories',
            filter: { retailerId: retailerId }
        };
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_select, 'application/json', JSON.stringify(body)).then(function (res) {
            var categories = res.result;
            return Promise.resolve(categories);
        });
    };
    StaffService.prototype.getOrderList = function () {
        var body = {
            collection: 'Orders',
            filter: {}
        };
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_select, 'application/json', JSON.stringify(body)).then(function (res) {
            var products = res.result;
            return Promise.resolve(products);
        });
    };
    StaffService.prototype.updateOrderStatus = function (orderId, status) {
        var filter = {};
        filter["_id"] = orderId;
        var data = { 'status': status };
        var body = {
            collection: 'Orders',
            filter: filter,
            data: data
        };
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_update_one, 'application/json', JSON.stringify(body));
    };
    StaffService.prototype.chooseSupplier = function (orderId, chosenSupplierUID) {
        var filter = {};
        filter["_id"] = orderId;
        var data = { status: 'salesBiding', 'chosenSupplier': chosenSupplierUID };
        var body = {
            collection: 'Orders',
            filter: filter,
            data: data
        };
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_update_one, 'application/json', JSON.stringify(body));
    };
    ;
    StaffService.prototype.finishOrder = function (orderId) {
        return Promise.resolve();
    };
    return StaffService;
}());
exports.StaffService = StaffService;
//# sourceMappingURL=StaffService.js.map