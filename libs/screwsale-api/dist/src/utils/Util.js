"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addOneZeroPrefix = function (num) {
    return num < 10 ? "0" + num : "" + num;
};
exports.timeText = function (timestamp) {
    var date = new Date(timestamp);
    var year = date.getFullYear();
    var month = exports.addOneZeroPrefix(date.getMonth() + 1);
    var day = exports.addOneZeroPrefix(date.getDate());
    var hours = exports.addOneZeroPrefix(date.getHours());
    var mins = exports.addOneZeroPrefix(date.getMinutes());
    var secs = exports.addOneZeroPrefix(date.getSeconds());
    return year + "/" + month + "/" + day + " " + hours + ":" + mins + ":" + secs;
};
exports.getUser = function () {
    return JSON.parse(localStorage.getItem('user'));
};
exports.email2UID = function (str, replace) {
    if (!str) {
        return str;
    }
    return str.replace(/[&\/\\#,+()$~%.@'":*?<>{}]/g, replace ? replace : '-');
};
//# sourceMappingURL=Util.js.map