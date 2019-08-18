"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = require("../utils/Util");
var CoreServiceHelper_1 = require("./CoreServiceHelper");
var Settings_1 = require("../Settings");
var RetailerService = /** @class */ (function () {
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
    RetailerService.prototype.createReplenishingOrder = function (order) {
        if (!order || !order.productItemId || !order.number) {
            return Promise.reject('wrong order params. need productItemId or number!');
        }
        var uid = Util_1.email2UID(Util_1.getUser().uid);
        order.source = 'retailer';
        order.owner = uid;
        order.type = 'replenishing';
        order.status = 'choosingSupplier';
        var body = {
            collection: 'Orders',
            data: order
        };
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_insert, 'application/json', JSON.stringify(body));
    }; /*! order should have productItemId and number */
    RetailerService.prototype.acceptOrder = function (orderId) {
        if (!orderId) {
            return Promise.reject('orderId cannot be empty!');
        }
        var filter = {};
        filter["_id"] = orderId;
        var data = { 'status': 'preparing' };
        var body = {
            collection: 'Orders',
            filter: filter,
            data: data
        };
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_update_one, 'application/json', JSON.stringify(body));
    };
    RetailerService.prototype.rejectOrder = function (orderId) {
        if (!orderId) {
            return Promise.reject('orderId cannot be empty!');
        }
        var filter = {};
        filter["_id"] = orderId;
        var data = { 'status': 'rejected' };
        var body = {
            collection: 'Orders',
            filter: filter,
            data: data
        };
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_update_one, 'application/json', JSON.stringify(body));
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
    RetailerService.prototype.updateProductNumber = function (productItemId, number) {
        var filter = { '_id': productItemId };
        var data = { number: number };
        var body = {
            collection: 'ProductItems',
            filter: filter,
            data: data
        };
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_update_one, 'application/json', JSON.stringify(body));
    };
    RetailerService.prototype.getProductItemList = function (retailerId) {
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
        var _a;
        var searchStr = "authorizedRetailerIds." + retailerId;
        var body = {
            collection: 'Categories',
            filter: (_a = {}, _a[searchStr] = { '$exists': true }, _a)
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