"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = require("../utils/Util");
var CoreServiceHelper_1 = require("./CoreServiceHelper");
var Settings_1 = require("../Settings");
var CommonService = /** @class */ (function () {
    function CommonService() {
        var _this = this;
        this.log = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.log.apply(console, ["[" + _this.env + "] " + Util_1.timeText(Date.now()) + " CommonService#"].concat(args));
        };
    }
    CommonService.prototype.init = function (env) {
        this.env = env;
        return Promise.resolve();
    };
    CommonService.prototype.uploadImage = function (imageofFormData) {
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_upload_image, 'application/json', imageofFormData);
    };
    CommonService.prototype.getImage = function (imageUrl, imageType) {
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().getImage(imageUrl, "image/" + imageType.toLowerCase());
    };
    CommonService.prototype.sendEmail = function (email, subject, content) {
        var body = {
            email: email,
            subject: subject,
            content: content
        };
        return CoreServiceHelper_1.CoreServiceHelper.getHelper().post(Settings_1.Settings.SERVER_CONFIG.connections.api_send_email, 'application/json', JSON.stringify(body));
    };
    return CommonService;
}());
exports.CommonService = CommonService;
//# sourceMappingURL=CommonService.js.map