"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var generateToken = function (res, user) {
    var token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' });
    res.cookie("token", token, { httpOnly: true, sameSite: 'strict', maxAge: 24 * 60 * 60 * 1000 });
    return token;
};
exports.generateToken = generateToken;
