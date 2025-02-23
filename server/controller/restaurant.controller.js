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
exports.getSingleRestaurant = exports.searchRestaurant = exports.updateOrderStatus = exports.getRestaurantOrder = exports.updateRestaurant = exports.getRestaurant = exports.createRestaurant = void 0;
var restaurant_model_1 = require("../models/restaurant.model");
var imageUpload_1 = require("../utils/imageUpload");
var order_model_1 = require("../models/order.model");
var createRestaurant = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, restaurantName, city, country, deliveryTime, cuisines, file, restaurant, imageUrl, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, restaurantName = _a.restaurantName, city = _a.city, country = _a.country, deliveryTime = _a.deliveryTime, cuisines = _a.cuisines;
                file = req.file;
                return [4 /*yield*/, restaurant_model_1.Restaurant.findOne({ user: req.id })];
            case 1:
                restaurant = _b.sent();
                if (restaurant) {
                    return [2 /*return*/, res.status(400).json({
                            success: false,
                            message: "Restaurant already exist for this user"
                        })];
                }
                if (!file) {
                    return [2 /*return*/, res.status(400).json({
                            success: false,
                            message: "Image is required"
                        })];
                }
                return [4 /*yield*/, (0, imageUpload_1.default)(file)];
            case 2:
                imageUrl = _b.sent();
                return [4 /*yield*/, restaurant_model_1.Restaurant.create({
                        user: req.id,
                        restaurantName: restaurantName,
                        city: city,
                        country: country,
                        deliveryTime: deliveryTime,
                        cuisines: JSON.parse(cuisines),
                        imageUrl: imageUrl
                    })];
            case 3:
                _b.sent();
                return [2 /*return*/, res.status(201).json({
                        success: true,
                        message: "Restaurant Added"
                    })];
            case 4:
                error_1 = _b.sent();
                console.log(error_1);
                return [2 /*return*/, res.status(500).json({ message: "Internal server error" })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.createRestaurant = createRestaurant;
var getRestaurant = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var restaurant, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, restaurant_model_1.Restaurant.findOne({ user: req.id }).populate('menus')];
            case 1:
                restaurant = _a.sent();
                if (!restaurant) {
                    return [2 /*return*/, res.status(404).json({
                            success: false,
                            restaurant: [],
                            message: "Restaurant not found"
                        })];
                }
                ;
                return [2 /*return*/, res.status(200).json({ success: true, restaurant: restaurant })];
            case 2:
                error_2 = _a.sent();
                console.log(error_2);
                return [2 /*return*/, res.status(500).json({ message: "Internal server error" })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getRestaurant = getRestaurant;
var updateRestaurant = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, restaurantName, city, country, deliveryTime, cuisines, file, restaurant, imageUrl, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                _a = req.body, restaurantName = _a.restaurantName, city = _a.city, country = _a.country, deliveryTime = _a.deliveryTime, cuisines = _a.cuisines;
                file = req.file;
                return [4 /*yield*/, restaurant_model_1.Restaurant.findOne({ user: req.id })];
            case 1:
                restaurant = _b.sent();
                if (!restaurant) {
                    return [2 /*return*/, res.status(404).json({
                            success: false,
                            message: "Restaurant not found"
                        })];
                }
                ;
                restaurant.restaurantName = restaurantName;
                restaurant.city = city;
                restaurant.country = country;
                restaurant.deliveryTime = deliveryTime;
                restaurant.cuisines = JSON.parse(cuisines);
                if (!file) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, imageUpload_1.default)(file)];
            case 2:
                imageUrl = _b.sent();
                restaurant.imageUrl = imageUrl;
                _b.label = 3;
            case 3: return [4 /*yield*/, restaurant.save()];
            case 4:
                _b.sent();
                return [2 /*return*/, res.status(200).json({
                        success: true,
                        message: "Restaurant updated",
                        restaurant: restaurant
                    })];
            case 5:
                error_3 = _b.sent();
                console.log(error_3);
                return [2 /*return*/, res.status(500).json({ message: "Internal server error" })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.updateRestaurant = updateRestaurant;
var getRestaurantOrder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var restaurant, orders, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, restaurant_model_1.Restaurant.findOne({ user: req.id })];
            case 1:
                restaurant = _a.sent();
                if (!restaurant) {
                    return [2 /*return*/, res.status(404).json({
                            success: false,
                            message: "Restaurant not found"
                        })];
                }
                ;
                return [4 /*yield*/, order_model_1.Order.find({ restaurant: restaurant._id }).populate('restaurant').populate('user')];
            case 2:
                orders = _a.sent();
                return [2 /*return*/, res.status(200).json({
                        success: true,
                        orders: orders
                    })];
            case 3:
                error_4 = _a.sent();
                console.log(error_4);
                return [2 /*return*/, res.status(500).json({ message: "Internal server error" })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getRestaurantOrder = getRestaurantOrder;
var updateOrderStatus = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orderId, status_1, order, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                orderId = req.params.orderId;
                status_1 = req.body.status;
                return [4 /*yield*/, order_model_1.Order.findById(orderId)];
            case 1:
                order = _a.sent();
                if (!order) {
                    return [2 /*return*/, res.status(404).json({
                            success: false,
                            message: "Order not found"
                        })];
                }
                order.status = status_1;
                return [4 /*yield*/, order.save()];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(200).json({
                        success: true,
                        status: order.status,
                        message: "Status updated"
                    })];
            case 3:
                error_5 = _a.sent();
                console.log(error_5);
                return [2 /*return*/, res.status(500).json({ message: "Internal server error" })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateOrderStatus = updateOrderStatus;
var searchRestaurant = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var searchText, searchQuery, selectedCuisines, query, restaurants, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                searchText = req.params.searchText || "";
                searchQuery = req.query.searchQuery || "";
                selectedCuisines = (req.query.selectedCuisines || "").split(",").filter(function (cuisine) { return cuisine; });
                query = {};
                // basic search based on searchText (name ,city, country)
                console.log(selectedCuisines);
                if (searchText) {
                    query.$or = [
                        { restaurantName: { $regex: searchText, $options: 'i' } },
                        { city: { $regex: searchText, $options: 'i' } },
                        { country: { $regex: searchText, $options: 'i' } },
                    ];
                }
                // filter on the basis of searchQuery
                if (searchQuery) {
                    query.$or = [
                        { restaurantName: { $regex: searchQuery, $options: 'i' } },
                        { cuisines: { $regex: searchQuery, $options: 'i' } }
                    ];
                }
                // console.log(query);
                // ["momos", "burger"]
                if (selectedCuisines.length > 0) {
                    query.cuisines = { $in: selectedCuisines };
                }
                return [4 /*yield*/, restaurant_model_1.Restaurant.find(query)];
            case 1:
                restaurants = _a.sent();
                return [2 /*return*/, res.status(200).json({
                        success: true,
                        data: restaurants
                    })];
            case 2:
                error_6 = _a.sent();
                console.log(error_6);
                return [2 /*return*/, res.status(500).json({ message: "Internal server error" })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.searchRestaurant = searchRestaurant;
var getSingleRestaurant = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var restaurantId, restaurant, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                restaurantId = req.params.id;
                return [4 /*yield*/, restaurant_model_1.Restaurant.findById(restaurantId).populate({
                        path: 'menus',
                        options: { createdAt: -1 }
                    })];
            case 1:
                restaurant = _a.sent();
                if (!restaurant) {
                    return [2 /*return*/, res.status(404).json({
                            success: false,
                            message: "Restaurant not found"
                        })];
                }
                ;
                return [2 /*return*/, res.status(200).json({ success: true, restaurant: restaurant })];
            case 2:
                error_7 = _a.sent();
                console.log(error_7);
                return [2 /*return*/, res.status(500).json({ message: "Internal server error" })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getSingleRestaurant = getSingleRestaurant;
