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
        if (!order || !order.productItemId || !order.retailerId || !order.number) {
            return Promise.reject('wrong order params. need productItemId, retailerId or number!');
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
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_insert, 'application/json', JSON.stringify(body));
    }; /*! order should have productItemId, retailerId and number attrs. */
    FranchiserService.prototype.createNormalOrder = function (order) {
        if (!order || !order.productItemId || !order.retailerId || !order.number) {
            return Promise.reject('wrong order params. need productItemId, retailerId or number!');
        }
        var uid = Util_1.email2UID(Util_1.getUser().uid);
        order.source = 'franchiser';
        order.owner = uid;
        order.type = 'normal';
        order.status = 'preparing';
        var body = {
            collection: 'Orders',
            data: order
        };
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_insert, 'application/json', JSON.stringify(body));
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
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_update_one, 'application/json', JSON.stringify(body));
    };
    FranchiserService.prototype.acceptOrder = function (orderId) {
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