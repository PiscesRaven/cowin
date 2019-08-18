"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = require("../utils/Util");
var CoreServiceHelper_1 = require("./CoreServiceHelper");
var Settings_1 = require("../Settings");
var RetailerService = (function () {
    function RetailerService() {
        var _this = this;
        this.log = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.log.apply(console, ["[" + _this.env + "] " + Util_1.timeText(Date.now()) + " RetailerService#"].concat(args));
        };
    }
    RetailerService.prototype.init = function (env) {
        this.env = env;
        return Promise.resolve();
    };
    RetailerService.prototype.createOrder = function (order, type) {
        if (!order || !order.productId || !order.number) {
            return Promise.reject('wrong order params. need productId or number!');
        }
        var uid = Util_1.email2UID(Util_1.getUser().uid);
        order.source = 'retailer';
        order.type = type;
        order.owner = uid;
        if (type === 'replenishing') {
            order.status = 'choosingSupplier';
        }
        else {
            return Promise.reject('order type is wrong!');
        }
        var body = {
            collection: 'Orders',
            data: order
        };
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_insert, 'application/json', JSON.stringify(body));
    };
    RetailerService.prototype.setProductNumber = function (productId, number, soldNumber) {
        var updateBody = {
            collection: 'Products',
            filter: {
                '_id': productId
            },
            data: { number: number, soldNumber: soldNumber }
        };
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_update_one, 'application/json', JSON.stringify(updateBody));
    };
    RetailerService.prototype.updateOrderPrice = function (orderId, price) {
        var filter = { _id: orderId };
        var data = { status: "franchiserChoosing", retailerPrice: price };
        var currentUser = Util_1.getUser();
        if (!currentUser) {
            return Promise.reject("please login!");
        }
        var body = {
            collection: 'Orders',
            filter: filter,
            data: data
        };
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_update_one, 'application/json', JSON.stringify(body));
    };
    RetailerService.prototype.getProductList = function (retailerId) {
        var body = {
            collection: 'Products',
            filter: { retailerId: retailerId }
        };
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_select, 'application/json', JSON.stringify(body)).then(function (res) {
            var products = res.result;
            return Promise.resolve(products);
        });
    };
    RetailerService.prototype.getCategoryList = function (retailerId) {
        var body = {
            collection: 'Categories',
            filter: { retailerId: retailerId }
        };
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_select, 'application/json', JSON.stringify(body)).then(function (res) {
            var categories = res.result;
            return Promise.resolve(categories);
        });
    };
    return RetailerService;
}());
exports.RetailerService = RetailerService;
//# sourceMappingURL=RetailerService.js.map