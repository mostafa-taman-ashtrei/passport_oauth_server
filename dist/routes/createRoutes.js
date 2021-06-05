"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
var constants_1 = require("../constants");
var scopes_1 = require("../services/auth/scopes");
var router = express_1.default();
var createRoutes = function (app) {
    router.get("/", function (_, res) { return res.json({ msg: "hello World!" }); });
    router.get("/auth/github", passport_1.default.authenticate("github"));
    router.get("/auth/github/callback", passport_1.default.authenticate("github", { failureRedirect: constants_1.failureUrl, session: true }), function (_, res) { return res.redirect(constants_1.successUrl); });
    router.get("/auth/facebook", passport_1.default.authenticate("facebook"));
    router.get("/auth/facebook/callback", passport_1.default.authenticate("facebook", { failureRedirect: constants_1.failureUrl, session: true, scope: scopes_1.facebookScopes }), function (_, res) { return res.redirect(constants_1.successUrl); });
    router.get("/getuser", function (req, res) {
        if (req.user) {
            console.log(req.user);
            return res.status(200).json({ user: req.user });
        }
        return res.status(401).json({ msg: "Unauthenticated" });
    });
    return app.use(router);
};
exports.default = createRoutes;
//# sourceMappingURL=createRoutes.js.map