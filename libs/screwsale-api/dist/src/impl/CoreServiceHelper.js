"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CoreServiceHelper = /** @class */ (function () {
    function CoreServiceHelper() {
        var _this = this;
        this.token = localStorage.getItem('token');
        this.getImage = function (url, contentType) {
            return fetch(url, {
                cache: 'no-cache',
                headers: {
                    'content-type': contentType,
                    'Authorization': _this.token
                },
                method: 'GET',
                mode: 'cors',
                redirect: 'follow',
                referrer: 'no-referrer' // *client, no-referrer
            })
                .then(function (response) {
                return response.arrayBuffer();
            })
                .catch(function (err) {
                return Promise.reject(err);
            });
        };
        this.post = function (url, contentType, body) {
            return fetch(url, {
                body: body,
                cache: 'no-cache',
                headers: {
                    'content-type': contentType,
                    'Authorization': _this.token
                },
                method: 'POST',
                mode: 'cors',
                redirect: 'follow',
                referrer: 'no-referrer' // *client, no-referrer
            })
                .then(function (response) {
                return response.json();
            })
                .then(function (resObj) {
                if (resObj.status !== 'success') {
                    return Promise.reject(resObj);
                }
                return Promise.resolve(resObj);
            })
                .catch(function (err) {
                return Promise.reject(err);
            });
        };
    }
    CoreServiceHelper.getHelper = function () {
        if (CoreServiceHelper.singleton) {
            return CoreServiceHelper.singleton;
        }
        CoreServiceHelper.singleton = new CoreServiceHelper();
        return CoreServiceHelper.singleton;
    };
    CoreServiceHelper.prototype.getToken = function () {
        return this.token;
    };
    CoreServiceHelper.prototype.setToken = function (token) {
        this.token = token;
    };
    return CoreServiceHelper;
}());
exports.CoreServiceHelper = CoreServiceHelper;
//# sourceMappingURL=CoreServiceHelper.js.map