"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sender = exports.client = void 0;
var mailtrap_1 = require("mailtrap");
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
exports.client = new mailtrap_1.MailtrapClient({ token: process.env.MAILTRAP_API_TOKEN });
exports.sender = {
    email: "mailtrap@demomailtrap.com",
    name: "Patel MernStack",
};
