"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cloudinary_1 = require("cloudinary");
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
cloudinary_1.v2.config({
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    cloud_name: process.env.CLOUD_NAME,
});
exports.default = cloudinary_1.v2;
