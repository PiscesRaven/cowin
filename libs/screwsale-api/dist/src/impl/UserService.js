"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = require("../utils/Util");
var CoreServiceHelper_1 = require("./CoreServiceHelper");
var Settings_1 = require("../Settings");
var UserService = /** @class */ (function () {
    function UserService() {
        var _this = this;
        this.log = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.log.apply(console, ["[" + _this.env + "] " + Util_1.timeText(Date.now()) + " UserServiceImpl#"].concat(args));
        };
    }
    UserService.prototype.init = function (env) {
        this.env = env;
        return Promise.resolve();
    };
    UserService.prototype.createUser = function (user, authorizedCategoryIds) {
        if (!user || !user.email || !user.password || !user.role) {
            return Promise.reject("param empty error!");
        }
        var rolesCheck = ['admin', 'agent', 'staff', 'supplier', 'retailer', 'franchiser'];
        if (rolesCheck.indexOf(user.role) === -1) {
            return Promise.reject('wrong role error!');
        }
        delete user["authorizedCategoryIds"];
        user.password = btoa(user.password);
        if (authorizedCategoryIds) {
            user.authorizedCategoryIds = {};
            authorizedCategoryIds.forEach(function (authorizedCategoryId) { return user.authorizedCategoryIds[authorizedCategoryId] = true; });
        }
        var body = { user: user };
        CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_send_email, 'application/json', JSON.stringify({
            email: user.email,
            content: user.email + " \u6B64\u5E33\u865F\u5DF2\u7D93\u88AB\u5275\u5EFA",
            subject: "[螺絲，帳號創建通知信]"
        }));
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_create_user, 'application/json', JSON.stringify(body));
    }; /*! the obj of user should have email, password ,role. role should be 'admin', 'agent', 'staff', 'supplier', 'retailer', 'franchiser'  */
    UserService.prototype.updateUser = function (email, user, authorizedCategoryIds) {
        delete user["_id"];
        delete user["authorizedCategoryIds"];
        if (user.password) {
            user.password = btoa(user.password);
        }
        if (authorizedCategoryIds) {
            user.authorizedCategoryIds = {};
            authorizedCategoryIds.forEach(function (authorizedCategoryId) { return user.authorizedCategoryIds[authorizedCategoryId] = true; });
        }
        var filter = {};
        filter["email"] = email;
        var data = user;
        var body = {
            collection: 'Users',
            filter: filter,
            data: data
        };
        CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_send_email, 'application/json', JSON.stringify({
            email: email,
            content: email + " \u6B64\u5E33\u865F\u5DF2\u7D93\u88AB\u4FEE\u6539",
            subject: "[螺絲，帳號修改通知信]"
        }));
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_update_one, 'application/json', JSON.stringify(body));
    };
    UserService.prototype.removeUser = function (email) {
        if (!email) {
            return Promise.reject("blank params error!");
        }
        var body = {
            collection: 'Users',
            filter: {
                "email": email
            }
        };
        CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_send_email, 'application/json', JSON.stringify({
            email: email,
            content: email + " \u6B64\u5E33\u865F\u5DF2\u7D93\u88AB\u522A\u9664",
            subject: "[螺絲，帳號刪除通知信]"
        }));
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_db_remove_one, 'application/json', JSON.stringify(body));
    }; /*! should have email */
    UserService.prototype.login = function (email, password, onLogoutListener) {
        var _this = this;
        password = btoa(password);
        var body = { email: email, password: password };
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_login, 'application/json', JSON.stringify(body)).then(function (result) {
            CoreServiceHelper_1.CoreServiceHelper.getHelper().setToken(result.token);
            var user = {
                _id: result.user ? result.user['_id'] : undefined,
                role: result.user ? result.user.role : undefined,
                name: result.user ? result.user.name : undefined,
                email: email,
                token: result.token
            };
            localStorage.setItem('token', result.token);
            localStorage.setItem('user', JSON.stringify(user));
            _this.onLogoutListener = onLogoutListener;
            return result;
        });
    };
    UserService.prototype.logout = function () {
        var _this = this;
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_logout, 'application/json', JSON.stringify({})).then(function (result) {
            CoreServiceHelper_1.CoreServiceHelper.getHelper().setToken('');
            localStorage.setItem('token', '');
            if (_this.onLogoutListener) {
                _this.log('logout# on logout listener exist. execute!');
                _this.onLogoutListener();
            }
            return result;
        });
    };
    UserService.prototype.getToken = function () {
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().getToken();
    };
    UserService.prototype.fetchToken = function () {
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_fetch_token, 'application/json', JSON.stringify({}));
    };
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=UserService.js.map