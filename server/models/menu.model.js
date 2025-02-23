"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Menu = void 0;
var mongoose_1 = require("mongoose");
var menuSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
}, { timestamps: true });
exports.Menu = mongoose_1.default.model("Menu", menuSchema);
