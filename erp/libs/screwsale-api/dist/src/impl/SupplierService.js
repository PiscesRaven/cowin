"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = require("../utils/Util");
var CoreServiceHelper_1 = require("./CoreServiceHelper");
var Settings_1 = require("../Settings");
var SupplierService = (function () {
    function SupplierService() {
        var _this = this;
        this.log = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.log.apply(console, ["[" + _this.env + "] " + Util_1.timeText(Date.now()) + " StaffService#"].concat(args));
        };
    }
    SupplierService.prototype.init = function (env) {
        this.env = env;
        return Promise.resolve();
    };
    SupplierService.prototype.getOrderList = function () {
        var body = {
            collection: 'Orders',
            filter: {}
        };
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_select, 'application/json', JSON.stringify(body)).then(function (res) {
            var orders = res.result;
            return Promise.resolve(orders);
        });
    };
    SupplierService.prototype.getbidOrderList = function () {
        var currentUser = Util_1.getUser();
        if (!currentUser) {
            return Promise.reject("please login!");
        }
        var uid = Util_1.email2UID(currentUser.email);
        var filter = {};
        filter["suppliers." + uid + ".uid"] = uid;
        var body = {
            collection: 'Orders',
            filter: filter
        };
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_select, 'application/json', JSON.stringify(body)).then(function (res) {
            var orders = res.result;
            return Promise.resolve(orders);
        });
    };
    SupplierService.prototype.updateBid = function (orderId, bidPrice) {
        var filter = { _id: orderId };
        var data = {};
        var currentUser = Util_1.getUser();
        if (!currentUser) {
            return Promise.reject("please login!");
        }
        var uid = Util_1.email2UID(currentUser.email);
        data["suppliers." + uid] = {
            uid: uid,
            bidPrice: bidPrice
        };
        var body = {
            collection: 'Orders',
            filter: filter,
            data: data
        };
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_update_one, 'application/json', JSON.stringify(body));
    };
    SupplierService.prototype.updateOrderStatus = function (orderId, status) {
        var filter = { _id: orderId };
        var data = {};
        var currentUser = Util_1.getUser();
        if (!currentUser) {
            return Promise.reject("please login!");
        }
        var uid = Util_1.email2UID(currentUser.email);
        data['status'] = status;
        var body = {
            collection: 'Orders',
            filter: filter,
            data: data
        };
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_update_one, 'application/json', JSON.stringify(body));
    };
    return SupplierService;
}());
exports.SupplierService = SupplierService;
//# sourceMappingURL=SupplierService.js.map