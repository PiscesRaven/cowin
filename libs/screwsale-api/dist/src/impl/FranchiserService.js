"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = require("../utils/Util");
var CoreServiceHelper_1 = require("./CoreServiceHelper");
var Settings_1 = require("../Settings");
var FranchiserService = /** @class */ (function () {
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
    // 改成categoryID
    // public getProductList(category: string, retailerId: string): Promise<any[]> {
    //     const body = {
    //         collection: 'Products',
    //         filter: { category: category, retailerId: retailerId }
    //     };
    //     return CoreServiceHelper.getHelper().post(Settings.SERVER_CONFIG.connections.api_db_select, 'application/json', JSON.stringify(body)).then((res) => {
    //         if (res && res.status === 'success') {
    //             const products = res.result;
    //             return Promise.resolve(products);
    //         } else {
    //             return Promise.reject(res);
    //         }
    //     });
    // }
    // public getCategoryList(retailerId: string): Promise<any[]> {
    //     const body = {
    //         collection: 'Products',
    //         filter: {'retailerId': retailerId}
    //     };
    //     return CoreServiceHelper.getHelper().post(Settings.SERVER_CONFIG.connections.api_db_select, 'application/json', JSON.stringify(body)).then((res) => {
    //         const products = res.result;
    //         return Promise.resolve(products);
    //     });
    // }
    FranchiserService.prototype.createSpecialOrder = function (order, productName) {
        if (!order || !order.retailerId || !order.number) {
            return Promise.reject('wrong order params. need productItemId, retailerId or number!');
        }
        var uid = Util_1.email2UID(Util_1.getUser().email);
        order.source = 'franchiser';
        order.owner = uid;
        order.type = 'special';
        order.status = 'choosingSupplier';
        var body = {
            collection: 'Orders',
            data: order
        };
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_insert, 'application/json', JSON.stringify(body)).then(function (res) {
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
                        content: "\u6709\u8A02\u55AE\u88AB\u5275\u5EFA, \n \u8A02\u55AE\u9023\u7D50: " + Settings_1.Settings.SERVER_CONFIG.connections.main_page + "/order?id=" + res.data['_id'],
                        subject: "訂單創建通知"
                    }));
                });
            }
            return res;
        });
    }; /*! order should have productItemId, retailerId and number attrs. */
    FranchiserService.prototype.createNormalOrder = function (order) {
        if (!order || !order.productItemId || !order.retailerId || !order.number) {
            return Promise.reject('wrong order params. need productItemId, retailerId or number!');
        }
        var uid = Util_1.email2UID(Util_1.getUser().email);
        order.source = 'franchiser';
        order.owner = uid;
        order.type = 'normal';
        order.status = 'preparing';
        var body = {
            collection: 'Orders',
            data: order
        };
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_insert, 'application/json', JSON.stringify(body)).then(function (res) {
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
                        content: "\u6709\u8A02\u55AE\u88AB\u5275\u5EFA, \n \u8A02\u55AE\u9023\u7D50: " + Settings_1.Settings.SERVER_CONFIG.connections.main_page + "/order?id=" + res.data['_id'],
                        subject: "訂單創建通知"
                    }));
                });
            }
            return res;
        });
        ;
    }; /*! order should have productItemId, retailerId and number attrs. */
    // public setProductNumber (productId: string, number: number, soldNumber: number): Promise<any> {
    //     const updateBody = {
    //         collection: 'Products',
    //         filter: {
    //             '_id': productId
    //         },
    //         data: {number: number, soldNumber: soldNumber}
    //     }
    //     return CoreServiceHelper.getHelper().post(Settings.SERVER_CONFIG.connections.api_db_update_one, 'application/json', JSON.stringify(updateBody));
    // }
    FranchiserService.prototype.updateOrderStatus = function (orderId, status) {
        var filter = {};
        filter["_id"] = orderId;
        var data = { 'status': status };
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
    FranchiserService.prototype.acceptOrder = function (orderId) {
        var filter = {};
        filter["_id"] = orderId;
        var data = { 'status': 'accepted' };
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
    FranchiserService.prototype.rejectOrder = function (orderId) {
        var filter = {};
        filter["_id"] = orderId;
        var data = { 'status': 'rejected' };
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
    FranchiserService.prototype.getOrderList = function () {
        var currentUser = Util_1.getUser();
        if (!currentUser || !currentUser['_id']) {
            return Promise.reject('Please login!');
        }
        var franchiserUID = Util_1.email2UID(currentUser.email);
        var body = {
            collection: 'Orders',
            filter: { owner: franchiserUID }
        };
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_select, 'application/json', JSON.stringify(body)).then(function (res) {
            var orders = res.result;
            return Promise.resolve(orders);
        });
    };
    FranchiserService.prototype.getProductItemList = function (retailerId, categoryId) {
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
    FranchiserService.prototype.getCategoryList = function (retailerId) {
        var body = {
            retailerId: retailerId
        };
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_get_authorize_category, 'application/json', JSON.stringify(body)).then(function (res) {
            var categories = res.result;
            return Promise.resolve(categories);
        });
    };
    FranchiserService.prototype.notifyRetailer = function (retailerId, product) {
        if (!retailerId || !product) {
            return Promise.reject('params blank error!');
        }
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_select_one, 'application/json', JSON.stringify({
            collection: 'Users',
            filter: {
                _id: retailerId
            }
        })).then(function (res) {
            if (res && !res.result) {
                return Promise.reject('retailer not found!');
            }
            var retailer = res.result;
            var body = {
                email: retailer.email,
                subject: '補貨通知',
                content: "\u5546\u54C1: " + product.name + " \u76EE\u524D\u7F3A\u8CA8\u4E2D , \u8ACB\u88DC\u8CA8. \n \u5546\u54C1id: " + product['_id'] + " \n \u5206\u985Eid: " + product.categoryId
            };
            return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_send_email, 'application/json', JSON.stringify(body)).then(function (result) {
                return { status: 'success', message: 'success' };
            });
        });
    };
    return FranchiserService;
}());
exports.FranchiserService = FranchiserService;
//# sourceMappingURL=FranchiserService.js.map