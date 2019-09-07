"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = require("../utils/Util");
var CoreServiceHelper_1 = require("./CoreServiceHelper");
var Settings_1 = require("../Settings");
var StaffService = /** @class */ (function () {
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
        if (!product || !product.categoryId) {
            return Promise.reject("blank params error!");
        }
        var body = {
            collection: 'Products',
            data: product
        };
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_insert, 'application/json', JSON.stringify(body));
    }; /*! product should have categoryId */
    StaffService.prototype.createCategory = function (category) {
        if (!category) {
            return Promise.reject("blank params error!");
        }
        var body = {
            collection: 'Categories',
            data: category
        };
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_insert, 'application/json', JSON.stringify(body));
    }; /*! category cannot be blank */
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
        if (!productId || !product) {
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
    }; /*! productId and product cannot be blank! */
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
    }; /*! categoryId and category cannot be blank! */
    StaffService.prototype.getProductList = function () {
        var body = {
            collection: 'Products',
            filter: {}
        };
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_select, 'application/json', JSON.stringify(body)).then(function (res) {
            var products = res.result;
            products.forEach(function (product) { return delete product.retailers; });
            return Promise.resolve(products);
        });
    };
    StaffService.prototype.getCategoryList = function () {
        var body = {
            collection: 'Categories',
            filter: {}
        };
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_select, 'application/json', JSON.stringify(body)).then(function (res) {
            var categories = res.result;
            return Promise.resolve(categories);
        });
    };
    StaffService.prototype.getProductItemList = function (categoryId) {
        if (!categoryId) {
            return Promise.reject('blank param error!');
        }
        var body = {
            collection: 'Products',
            filter: { categoryId: categoryId }
        };
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
                Object.keys(product.retailers).forEach(function (retailerId) {
                    returnObj.number = product.retailers && product.retailers[retailerId] ? product.retailers[retailerId].number : 0;
                    returnObj.soldNumber = product.retailers && product.retailers[retailerId] ? product.retailers[retailerId].soldNumber : 0;
                });
                returnObj.productId = product["_id"];
                delete returnObj.product.retailers;
                returnObjList.push(returnObj);
            });
            return Promise.resolve(returnObjList);
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
    // public authorizeCategory (retailerId: string, categoryId: string): Promise<any> {
    //     if (!retailerId || !categoryId) {
    //         return Promise.reject('blank params of retailerId or categoryId');
    //     }
    //     const filter = {};
    //     filter["_id"] = categoryId;
    //     const updateStr = `authorizedRetailerIds.${retailerId}`;
    //     const data = {'status': status, [updateStr]: true};
    //     const body = {
    //         collection: 'Categories',
    //         filter: filter,
    //         data: data
    //     };
    //     return CoreServiceHelper.getHelper().post(Settings.SERVER_CONFIG.connections.api_db_update_one, 'application/json', JSON.stringify(body));
    // } /*! retailerId and categoryId cannot be blank. */
    StaffService.prototype.updateOrderStatus = function (orderId, status) {
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
    StaffService.prototype.chooseBiddingSupplier = function (orderId, chosenSupplierIds) {
        if (!orderId || !chosenSupplierIds) {
            return Promise.reject("blank params error!");
        }
        var filter = {};
        filter["_id"] = orderId;
        var data = {};
        chosenSupplierIds.forEach(function (chosenSupplierId) {
            data["chosenSuppliers." + chosenSupplierId] = { _id: chosenSupplierId };
        });
        var body = {
            collection: 'Orders',
            filter: filter,
            data: data
        };
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_update_one, 'application/json', JSON.stringify(body)).then(function (res) {
            if (res && res.status === 'success') {
                CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_multi_select, 'application/json', JSON.stringify({
                    collection: 'Users',
                    ids: chosenSupplierIds
                })).then(function (res) {
                    var result = res.result ? res.result : [];
                    var emails = [];
                    result.forEach(function (r) {
                        emails.push(r.email);
                    });
                    CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_send_emails, 'application/json', JSON.stringify({
                        emails: emails,
                        content: "\u6709\u8A02\u55AE\u9700\u5831\u50F9 \n \u8A02\u55AE\u9023\u7D50: " + Settings_1.Settings.SERVER_CONFIG.connections.main_page + "/order?id=" + orderId,
                        subject: "訂單修改通知"
                    }));
                });
            }
            return res;
        });
    };
    ; /*! orderId and chosenSupplierId cannot be blank. */
    StaffService.prototype.chooseBiddingWinner = function (orderId, chosenSupplierId) {
        var _a;
        var user = Util_1.getUser();
        if (!orderId || !chosenSupplierId || !user || !user.email) {
            return Promise.reject("blank params error!");
        }
        var userObj = {
            email: user.email,
            updatedTime: Date.now()
        };
        var filter = {};
        filter["_id"] = orderId;
        var searchStr = "chosenSuppliers." + chosenSupplierId + ".isWinner";
        var data = (_a = { status: 'salesBiding', 'biddingSupplierWinnerId': chosenSupplierId, 'updatingStaff': userObj }, _a[searchStr] = true, _a);
        var body = {
            collection: 'Orders',
            filter: filter,
            data: data
        };
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_update_one, 'application/json', JSON.stringify(body)).then(function (res) {
            if (res && res.status === 'success') {
                CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_multi_select, 'application/json', JSON.stringify({
                    collection: 'Users',
                    ids: [chosenSupplierId]
                })).then(function (res) {
                    var result = res.result ? res.result : [];
                    var emails = [];
                    result.forEach(function (r) {
                        emails.push(r.email);
                    });
                    CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_send_emails, 'application/json', JSON.stringify({
                        emails: emails,
                        content: "\u5DF2\u78BA\u8A8D\u4F9B\u61C9\u5546\u7DE8\u865F " + chosenSupplierId + " \u8D0F\u5F97\u5B9A\u55AE \n \u8A02\u55AE\u9023\u7D50: " + Settings_1.Settings.SERVER_CONFIG.connections.main_page + "/order?id=" + orderId,
                        subject: "訂單修改通知"
                    }));
                });
            }
            return res;
        });
    };
    ; /*! orderId and chosenSupplierId cannot be blank. */
    return StaffService;
}());
exports.StaffService = StaffService;
//# sourceMappingURL=StaffService.js.map