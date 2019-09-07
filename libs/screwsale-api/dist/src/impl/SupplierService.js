"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = require("../utils/Util");
var CoreServiceHelper_1 = require("./CoreServiceHelper");
var Settings_1 = require("../Settings");
var SupplierService = /** @class */ (function () {
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
        var _a;
        var currentUser = Util_1.getUser();
        if (!currentUser || !currentUser['_id']) {
            return Promise.reject('Please login!');
        }
        var supplierId = currentUser['_id'];
        var searchStr = "chosenSuppliers." + supplierId;
        var body = {
            collection: 'Orders',
            filter: (_a = {}, _a[searchStr] = { '$exists': true }, _a)
        };
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_select, 'application/json', JSON.stringify(body)).then(function (res) {
            var orders = res.result;
            orders.forEach(function (order) {
                (order.chosenSuppliers || []).forEach(function (otherSupplierId) {
                    if (otherSupplierId !== supplierId)
                        delete order.chosenSuppliers[otherSupplierId];
                });
            });
            return Promise.resolve(orders);
        });
    };
    // public getbidOrderList(): Promise<any> {
    //     const currentUser = getUser();
    //     if (!currentUser) {
    //         return Promise.reject("please login!");
    //     }
    //     const uid = email2UID(currentUser.email);
    //     const filter = {};
    //     filter[`suppliers.${uid}.uid`] = uid;
    //     const body = {
    //         collection: 'Orders',
    //         filter: filter
    //     };
    //     return CoreServiceHelper.getHelper().post(Settings.SERVER_CONFIG.connections.api_db_select, 'application/json', JSON.stringify(body)).then((res) => {
    //         const orders = res.result;
    //         return Promise.resolve(orders);
    //     });
    // }
    SupplierService.prototype.updateBid = function (orderId, bidPrice) {
        var _a;
        var data = {};
        var currentUser = Util_1.getUser();
        if (!currentUser || !currentUser['_id']) {
            return Promise.reject("please login!");
        }
        if (!bidPrice) {
            return Promise.reject("bidPrice cannot be empty!");
        }
        var supplierId = currentUser['_id'];
        var searchStr = "chosenSuppliers." + supplierId;
        var filter = (_a = { _id: orderId }, _a[searchStr] = { '$exists': true }, _a);
        data["chosenSuppliers." + supplierId + ".bidPrice"] = bidPrice;
        var body = {
            collection: 'Orders',
            filter: filter,
            data: data
        };
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_update_one, 'application/json', JSON.stringify(body)).then(function (res) {
            if (res && res.status === 'success') {
                CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_multi_select, 'application/json', JSON.stringify({
                    collection: 'Users',
                    ids: []
                })).then(function (res) {
                    var result = res.result ? res.result : [];
                    var emails = [];
                    result.forEach(function (r) {
                        emails.push(r.email);
                    });
                    CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_send_emails, 'application/json', JSON.stringify({
                        emails: emails,
                        content: "\u6709\u8A02\u55AE\u88AB\u4FEE\u6539, \n \u8A02\u55AE\u9023\u7D50: " + Settings_1.Settings.SERVER_CONFIG.connections.main_page + "/order?id=" + orderId,
                        subject: "訂單修改通知"
                    }));
                });
            }
            return res;
        });
    };
    SupplierService.prototype.updateOrderStatus = function (orderId, status) {
        var _a;
        var currentUser = Util_1.getUser();
        if (!currentUser || currentUser['_id']) {
            return Promise.reject("please login!");
        }
        var supplierId = currentUser['_id'];
        var searchStr = "chosenSuppliers." + supplierId;
        var filter = (_a = { _id: orderId }, _a[searchStr] = { '$exists': true }, _a);
        var data = {};
        data['status'] = status;
        var body = {
            collection: 'Orders',
            filter: filter,
            data: data
        };
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_update_one, 'application/json', JSON.stringify(body)).then(function (res) {
            if (res && res.status === 'success') {
                CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_multi_select, 'application/json', JSON.stringify({
                    collection: 'Users',
                    ids: []
                })).then(function (res) {
                    var result = res.result ? res.result : [];
                    var emails = [];
                    result.forEach(function (r) {
                        emails.push(r.email);
                    });
                    CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_send_emails, 'application/json', JSON.stringify({
                        emails: emails,
                        content: "\u6709\u8A02\u55AE\u88AB\u4FEE\u6539, \n \u8A02\u55AE\u9023\u7D50: " + Settings_1.Settings.SERVER_CONFIG.connections.main_page + "/order?id=" + orderId,
                        subject: "訂單修改通知"
                    }));
                });
            }
            return res;
        });
    };
    return SupplierService;
}());
exports.SupplierService = SupplierService;
//# sourceMappingURL=SupplierService.js.map