"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = require("../utils/Util");
var CoreServiceHelper_1 = require("./CoreServiceHelper");
var Settings_1 = require("../Settings");
var FranchiserService = (function () {
    function FranchiserService() {
        var _this = this;
        this.log = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.log.apply(console, ["[" + _this.env + "] " + Util_1.timeText(Date.now()) + " FranchiserService#"].concat(args));
        };
    }
    FranchiserService.prototype.init = function (env) {
        this.env = env;
        return Promise.resolve();
    };
    FranchiserService.prototype.getProductList = function (category, retailerId) {
        var body = {
            collection: 'Products',
            filter: { category: category, retailerId: retailerId }
        };
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_select, 'application/json', JSON.stringify(body)).then(function (res) {
            if (res && res.status === 'success') {
                var products = res.result;
                return Promise.resolve(products);
            }
            else {
                return Promise.reject(res);
            }
        });
    };
    FranchiserService.prototype.getCategoryList = function (retailerId) {
        var body = {
            collection: 'Products',
            filter: { 'retailerId': retailerId }
        };
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_select, 'application/json', JSON.stringify(body)).then(function (res) {
            var products = res.result;
            return Promise.resolve(products);
        });
    };
    FranchiserService.prototype.createSpecialOrder = function (order, productName) {
        if (!order || !order.productId || !order.retailerId || !order.number) {
            return Promise.reject('wrong order params. need productId, retailerId or number!');
        }
        var uid = Util_1.email2UID(Util_1.getUser().uid);
        order.source = 'franchiser';
        order.owner = uid;
        order.type = 'special';
        order.status = 'choosingSupplier';
        var body = {
            collection: 'Orders',
            data: order
        };
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_insert, 'application/json', JSON.stringify(body))
            .then(function (res) {
            if (!res || res.status !== 'success') {
                return Promise.reject(res);
            }
            var insertBody = {
                collection: 'Products',
                data: {
                    name: productName,
                    category: 'special',
                    type: 'special',
                    description: order.description,
                    imageUrl: order.imageUrl,
                    size: order.size,
                    color: order.color,
                    number: 0,
                    retailerId: order.retailerId
                }
            };
            return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_insert, 'application/json', JSON.stringify(insertBody));
        });
    };
    FranchiserService.prototype.createNormalOrder = function (order) {
        if (!order || !order.productId || !order.number) {
            return Promise.reject('wrong order params. need productId or number!');
        }
        var uid = Util_1.email2UID(Util_1.getUser().uid);
        order.source = 'franchiser';
        order.owner = uid;
        order.type = 'normal';
        order.status = 'finished';
        var body = {
            collection: 'Orders',
            data: order
        };
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_insert, 'application/json', JSON.stringify(body));
    };
    FranchiserService.prototype.setProductNumber = function (productId, number, soldNumber) {
        var updateBody = {
            collection: 'Products',
            filter: {
                '_id': productId
            },
            data: { number: number, soldNumber: soldNumber }
        };
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_update_one, 'application/json', JSON.stringify(updateBody));
    };
    FranchiserService.prototype.updateOrderStatus = function (orderId, status) {
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
    FranchiserService.prototype.acceptOrder = function (orderId) {
        var filter = {};
        filter["_id"] = orderId;
        var data = { 'status': 'finished' };
        var body = {
            collection: 'Orders',
            filter: filter,
            data: data
        };
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_update_one, 'application/json', JSON.stringify(body));
    };
    FranchiserService.prototype.rejectOrder = function (orderId) {
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
    FranchiserService.prototype.getOrderList = function () {
        var uid = Util_1.email2UID(Util_1.getUser().uid);
        var body = {
            collection: 'Orders',
            filter: {
                owner: uid
            }
        };
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_select, 'application/json', JSON.stringify(body)).then(function (res) {
            var orders = res.result;
            return Promise.resolve(orders);
        });
    };
    return FranchiserService;
}());
exports.FranchiserService = FranchiserService;
//# sourceMappingURL=FranchiserService.js.map