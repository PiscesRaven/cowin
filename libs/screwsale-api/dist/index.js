"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Settings_1 = require("./src/Settings");
var UserService_1 = require("./src/impl/UserService");
var AdminService_1 = require("./src/impl/AdminService");
var StaffService_1 = require("./src/impl/StaffService");
var SalesService_1 = require("./src/impl/SalesService");
var SupplierService_1 = require("./src/impl/SupplierService");
var RetailerService_1 = require("./src/impl/RetailerService");
var FranchiserService_1 = require("./src/impl/FranchiserService");
var CommonService_1 = require("./src/impl/CommonService");
var ScrewSaleApi = /** @class */ (function () {
    function ScrewSaleApi() {
        this.userService = new UserService_1.UserService();
        this.adminService = new AdminService_1.AdminService();
        this.staffService = new StaffService_1.StaffService();
        this.salesService = new SalesService_1.SalesService();
        this.supplierService = new SupplierService_1.SupplierService();
        this.retailerService = new RetailerService_1.RetailerService();
        this.franchiserService = new FranchiserService_1.FranchiserService();
        this.commonService = new CommonService_1.CommonService();
        console.log('constructor');
    }
    ScrewSaleApi.prototype.setupSettings = function (env) {
        switch (env.toLowerCase()) {
            case 'fut':
                Settings_1.Settings.SERVER_CONFIG.connections = Settings_1.Settings.CONNECTIONS_FUT;
                break;
            case 'dev':
                Settings_1.Settings.SERVER_CONFIG.connections = Settings_1.Settings.CONNECTIONS_DEV;
                break;
            case 'local':
                Settings_1.Settings.SERVER_CONFIG.connections = Settings_1.Settings.CONNECTIONS_LOCAL;
                break;
        }
    };
    ScrewSaleApi.GET = function () {
        if (ScrewSaleApi.instance) {
            return this.instance;
        }
        ScrewSaleApi.instance = new ScrewSaleApi();
        return ScrewSaleApi.instance;
    };
    ScrewSaleApi.prototype.init = function (env) {
        this.env = env;
        this.setupSettings(env);
        return Promise.all([
            this.userService.init(env),
            this.adminService.init(env),
            this.staffService.init(env),
            this.salesService.init(env),
            this.supplierService.init(env),
            this.retailerService.init(env),
            this.franchiserService.init(env),
            this.commonService.init(env)
        ]).then(function () { return Promise.resolve('init success'); });
    };
    ScrewSaleApi.prototype.getUserService = function () {
        return this.userService;
    };
    ScrewSaleApi.prototype.getAdminService = function () {
        return this.adminService;
    };
    ScrewSaleApi.prototype.getSalesService = function () {
        return this.salesService;
    };
    ScrewSaleApi.prototype.getStaffService = function () {
        return this.staffService;
    };
    ScrewSaleApi.prototype.getSupplierService = function () {
        return this.supplierService;
    };
    ScrewSaleApi.prototype.getRetailerService = function () {
        return this.retailerService;
    };
    ScrewSaleApi.prototype.getFranchiserService = function () {
        return this.franchiserService;
    };
    ScrewSaleApi.prototype.getCommonService = function () {
        return this.commonService;
    };
    return ScrewSaleApi;
}());
exports.ScrewSaleApi = ScrewSaleApi;
//@ts-ignore
window.screwSaleApi = ScrewSaleApi.GET();
exports.screwSaleApi = ScrewSaleApi.GET();
//# sourceMappingURL=index.js.map