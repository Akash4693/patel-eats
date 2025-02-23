"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var multer_1 = require("multer");
var storage = multer_1.default.memoryStorage();
var upload = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5mb
    }
});
exports.default = upload;
