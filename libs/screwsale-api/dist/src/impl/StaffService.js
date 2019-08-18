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
    StaffService.prototype.createProductItem = function (productItem, product) {
        if (!productItem || !productItem.productId || productItem.retailerId || !product) {
            return Promise.reject("blank params error!");
        }
        productItem.product = product;
        productItem.number = productItem.number ? productItem.number : 0;
        productItem.soldNumber = 0;
        var body = {
            collection: 'ProductItems',
            data: productItem
        };
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_insert, 'application/json', JSON.stringify(body));
    }; /*! productItem should have productId, retailerId attrs. product cannot be blank. */
    StaffService.prototype.updateProductItem = function (productItemId, productItem) {
        if (!productItemId || !productItem || !productItem.productId || productItem.retailerId) {
            return Promise.reject("blank params error!");
        }
        delete productItem["_id"];
        var body = {
            collection: 'ProductItems',
            filter: {
                "_id": productItemId
            },
            data: productItem
        };
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_update_one, 'application/json', JSON.stringify(body));
    }; /*! productItem should have productId, retailerId attrs. productItemId cannot be blank. */
    StaffService.prototype.removeProductItem = function (productItemId) {
        if (!productItemId) {
            return Promise.reject("blank params error!");
        }
        var body = {
            collection: 'ProductItems',
            filter: {
                "_id": productItemId
            }
        };
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_remove_one, 'application/json', JSON.stringify(body));
    }; /*! productItemId cannot be blank */
    StaffService.prototype.getProductList = function () {
        var body = {
            collection: 'Products',
            filter: {}
        };
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_select, 'application/json', JSON.stringify(body)).then(function (res) {
            var products = res.result;
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
    StaffService.prototype.getProductItemList = function () {
        var body = {
            collection: 'ProductItems',
            filter: {}
        };
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_select, 'application/json', JSON.stringify(body)).then(function (res) {
            var productItems = res.result;
            return Promise.resolve(productItems);
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
    StaffService.prototype.authorizeCategory = function (retailerId, categoryId) {
        var _a;
        if (!retailerId || !categoryId) {
            return Promise.reject('blank params of retailerId or categoryId');
        }
        var filter = {};
        filter["_id"] = categoryId;
        var updateStr = "authorizedRetailerIds." + retailerId;
        var data = (_a = { 'status': status }, _a[updateStr] = true, _a);
        var body = {
            collection: 'Categories',
            filter: filter,
            data: data
        };
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_update_one, 'application/json', JSON.stringify(body));
    }; /*! retailerId and categoryId cannot be blank. */
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
    StaffService.prototype.chooseBiddingSupplier = function (orderId, chosenSupplierId) {
        if (!orderId || !chosenSupplierId) {
            return Promise.reject("blank params error!");
        }
        var filter = {};
        filter["_id"] = orderId;
        var data = {};
        data["chosenSuppliers." + chosenSupplierId] = { _id: chosenSupplierId };
        var body = {
            collection: 'Orders',
            filter: filter,
            data: data
        };
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_update_one, 'application/json', JSON.stringify(body));
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
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_update_one, 'application/json', JSON.stringify(body));
    };
    ; /*! orderId and chosenSupplierId cannot be blank. */
    return StaffService;
}());
exports.StaffService = StaffService;
//# sourceMappingURL=StaffService.js.map