"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = require("../utils/Util");
var CoreServiceHelper_1 = require("./CoreServiceHelper");
var Settings_1 = require("../Settings");
var SalesService = (function () {
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
            var products = res.result;
            return Promise.resolve(products);
        });
    };
    ;
    SalesService.prototype.updateOrderRetailerPrice = function (orderId, retailerUID, price) {
        var filter = {};
        filter["_id"] = orderId;
        var data = { status: 'retailerBiding', 'retailers': {
                'uid': retailerUID,
                'price': price
            } };
        var body = {
            collection: 'Orders',
            filter: filter,
            data: data
        };
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_update_one, 'application/json', JSON.stringify(body));
    };
    return SalesService;
}());
exports.SalesService = SalesService;
//# sourceMappingURL=SalesService.js.map