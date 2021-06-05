"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    githubId: {
        required: false,
        type: String,
    },
    facebookId: {
        required: false,
        type: String,
    },
    username: {
        required: true,
        type: String,
    },
});
var UserModel = mongoose_1.model("User", userSchema);
exports.default = UserModel;
//# sourceMappingURL=User.js.map