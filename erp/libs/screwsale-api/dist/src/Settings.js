"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Settings;
(function (Settings) {
    Settings.CONNECTIONS_FUT = {
        api_db_select: "http://34.80.214.97:8000/data/select",
        api_db_select_one: "http://34.80.214.97:8000/data/selectOne",
        api_db_insert: "http://34.80.214.97:8000/data/insert",
        api_db_update: "http://34.80.214.97:8000/data/update",
        api_db_remove: "http://34.80.214.97:8000/data/remove",
        api_db_update_one: "http://34.80.214.97:8000/data/updateOne",
        api_db_remove_one: "http://34.80.214.97:8000/data/removeOne",
        api_create_user: "http://34.80.214.97:8000/user/createUser",
        api_login: "http://34.80.214.97:8000/user/login",
        api_logout: "http://34.80.214.97:8000/user/logout",
        api_fetch_token: "http://34.80.214.97:8000/user/fetchToken",
        api_upload_image: "http://34.80.214.97:8000/common/uploadImage",
        api_send_email: "http://34.80.214.97:8000/common/sendEmail"
    };
    Settings.CONNECTIONS_DEV = {
        api_db_select: "http://34.80.214.97:12345/data/select",
        api_db_select_one: "http://34.80.214.97:12345/data/selectOne",
        api_db_insert: "http://34.80.214.97:12345/data/insert",
        api_db_update: "http://34.80.214.97:12345/data/update",
        api_db_remove: "http://34.80.214.97:12345/data/remove",
        api_db_update_one: "http://34.80.214.97:12345/data/updateOne",
        api_db_remove_one: "http://34.80.214.97:12345/data/removeOne",
        api_create_user: "http://34.80.214.97:12345/user/createUser",
        api_login: "http://34.80.214.97:12345/user/login",
        api_logout: "http://34.80.214.97:12345/user/logout",
        api_fetch_token: "http://34.80.214.97:12345/user/fetchToken",
        api_upload_image: "http://34.80.214.97:12345/common/uploadImage",
        api_send_email: "http://34.80.214.97:12345/common/sendEmail"
    };
    Settings.CONNECTIONS_LOCAL = {
        api_db_select: "http://localhost:12345/data/select",
        api_db_select_one: "http://localhost:12345/data/selectOne",
        api_db_insert: "http://localhost:12345/data/insert",
        api_db_update: "http://localhost:12345/data/update",
        api_db_remove: "http://localhost:12345/data/remove",
        api_db_update_one: "http://localhost:12345/data/updateOne",
        api_db_remove_one: "http://localhost:12345/data/removeOne",
        api_create_user: "http://localhost:12345/user/createUser",
        api_login: "http://localhost:12345/user/login",
        api_logout: "http://localhost:12345/user/logout",
        api_fetch_token: "http://localhost:12345/user/fetchToken",
        api_upload_image: "http://localhost:12345/common/uploadImage",
        api_send_email: "http://localhost:12345/common/sendEmail"
    };
    Settings.SERVER_CONFIG = {
        connections: {
            api_db_select: "http://localhost:12345/data/select",
            api_db_select_one: "http://localhost:12345/data/selectOne",
            api_db_insert: "http://localhost:12345/data/insert",
            api_db_update: "http://localhost:12345/data/update",
            api_db_remove: "http://localhost:12345/data/remove",
            api_db_update_one: "http://localhost:12345/data/updateOne",
            api_db_remove_one: "http://localhost:12345/data/removeOne",
            api_create_user: "http://localhost:12345/user/createUser",
            api_login: "http://localhost:12345/user/login",
            api_logout: "http://localhost:12345/user/logout",
            api_fetch_token: "http://localhost:12345/user/fetchToken",
            api_upload_image: "http://localhost:12345/common/uploadImage",
            api_send_email: "http://localhost:12345/common/sendEmail"
        }
    };
})(Settings = exports.Settings || (exports.Settings = {}));
//# sourceMappingURL=Settings.js.map