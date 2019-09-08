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
    SalesService.prototype.removeOrder = function (orderId) {
        if (!orderId) {
            return Promise.reject('orderId is blank!');
        }
        var filter = {
            '_id': orderId
        };
        var body = {
            collection: 'Orders',
            filter: filter
        };
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_remove_one, 'application/json', JSON.stringify(body)).then(function (res) {
            if (res && res.status === 'success') {
                CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_multi_select, 'application/json', JSON.stringify({
                    collection: 'Users',
                    ids: []
                })).then(function (multiRes) {
                    var result = multiRes.result ? multiRes.result : [];
                    var emails = [];
                    result.forEach(function (r) {
                        emails.push(r.email);
                    });
                    CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_send_emails, 'application/json', JSON.stringify({
                        emails: emails,
                        content: "\u6709\u8A02\u55AE\u88AB\u522A\u9664, \u8A02\u55AEid: " + orderId,
                        subject: "訂單刪除通知"
                    }));
                });
            }
            return res;
        });
    }; /*! order should have orderId */
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
    SalesService.prototype.updateOrderPrice = function (orderId, retailerId, price) {
        var filter = {};
        filter["_id"] = orderId;
        var data = { status: 'retailerBiding', 'retailer': {
                '_id': retailerId,
                'price': price
            } };
        var body = {
            collection: 'Orders',
            filter: filter,
            data: data
        };
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_select_one, 'application/json', JSON.stringify({ collection: 'Orders', filter: filter }))
            .then(function (result) {
            var order = result.result;
            if (!order) {
                return Promise.reject('order not exist!');
            }
            if (order.source === 'retailer') {
                data.status = 'retailerChoosing';
            }
            else if (order.source === 'franchiser') {
                data.status = 'retailerBiding';
            }
            else {
                return Promise.reject("order source is wrong! source: " + order.status);
            }
            return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_update_one, 'application/json', JSON.stringify(body)).then(function (res) {
                if (res && res.status === 'success') {
                    CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_multi_select, 'application/json', JSON.stringify({
                        collection: 'Users',
                        ids: [retailerId]
                    })).then(function (res) {
                        var result = res.result ? res.result : [];
                        var emails = [];
                        result.forEach(function (r) {
                            emails.push(r.email);
                        });
                        CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_send_emails, 'application/json', JSON.stringify({
                            emails: emails,
                            content: "\u6709\u8A02\u55AE\u50F9\u683C\u88AB\u4FEE\u6539, \n \u8A02\u55AE\u9023\u7D50: " + Settings_1.Settings.SERVER_CONFIG.connections.main_page + "/order?id=" + orderId,
                            subject: "訂單修改通知"
                        }));
                    });
                }
                return res;
            });
        });
    };
    return SalesService;
}());
exports.SalesService = SalesService;
//# sourceMappingURL=SalesService.js.map