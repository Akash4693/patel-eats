"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editMenu = exports.addMenu = void 0;
var imageUpload_1 = require("../utils/imageUpload");
var menu_model_1 = require("../models/menu.model");
var restaurant_model_1 = require("../models/restaurant.model");
var addMenu = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_1, description, price, file, imageUrl, menu, restaurant, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 6, , 7]);
                _a = req.body, name_1 = _a.name, description = _a.description, price = _a.price;
                file = req.file;
                if (!file) {
                    return [2 /*return*/, res.status(400).json({
                            success: false,
                            message: "Image is required"
                        })];
                }
                ;
                return [4 /*yield*/, (0, imageUpload_1.default)(file)];
            case 1:
                imageUrl = _b.sent();
                return [4 /*yield*/, menu_model_1.Menu.create({
                        name: name_1,
                        description: description,
                        price: price,
                        image: imageUrl
                    })];
            case 2:
                menu = _b.sent();
                return [4 /*yield*/, restaurant_model_1.Restaurant.findOne({ user: req.id })];
            case 3:
                restaurant = _b.sent();
                if (!restaurant) return [3 /*break*/, 5];
                restaurant.menus.push(menu._id);
                return [4 /*yield*/, restaurant.save()];
            case 4:
                _b.sent();
                _b.label = 5;
            case 5: return [2 /*return*/, res.status(201).json({
                    success: true,
                    message: "Menu added successfully",
                    menu: menu
                })];
            case 6:
                error_1 = _b.sent();
                console.log(error_1);
                return [2 /*return*/, res.status(500).json({ message: "Internal server error" })];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.addMenu = addMenu;
var editMenu = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, name_2, description, price, file, menu, imageUrl, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                id = req.params.id;
                _a = req.body, name_2 = _a.name, description = _a.description, price = _a.price;
                file = req.file;
                return [4 /*yield*/, menu_model_1.Menu.findById(id)];
            case 1:
                menu = _b.sent();
                if (!menu) {
                    return [2 /*return*/, res.status(404).json({
                            success: false,
                            message: "Menu not found!"
                        })];
                }
                if (name_2)
                    menu.name = name_2;
                if (description)
                    menu.description = description;
                if (price)
                    menu.price = price;
                if (!file) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, imageUpload_1.default)(file)];
            case 2:
                imageUrl = _b.sent();
                menu.image = imageUrl;
                _b.label = 3;
            case 3: return [4 /*yield*/, menu.save()];
            case 4:
                _b.sent();
                return [2 /*return*/, res.status(200).json({
                        success: true,
                        message: "Menu updated",
                        menu: menu,
                    })];
            case 5:
                error_2 = _b.sent();
                console.log(error_2);
                return [2 /*return*/, res.status(500).json({ message: "Internal server error" })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.editMenu = editMenu;
