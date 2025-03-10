"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRestaurantStore = void 0;
var axios_1 = require("axios");
var sonner_1 = require("sonner");
var zustand_1 = require("zustand");
var middleware_1 = require("zustand/middleware");
var API_END_POINT = "http://localhost:8000/api/v1/restaurant";
axios_1.default.defaults.withCredentials = true;
exports.useRestaurantStore = (0, zustand_1.create)()((0, middleware_1.persist)(function (set, get) { return ({
    loading: false,
    restaurant: null,
    searchedRestaurant: null,
    appliedFilter: [],
    singleRestaurant: null,
    restaurantOrder: [],
    createRestaurant: function (formData) { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    set({ loading: true });
                    return [4 /*yield*/, axios_1.default.post("".concat(API_END_POINT, "/"), formData, {
                            headers: {
                                "Content-Type": "multipart/form-data",
                            },
                        })];
                case 1:
                    response = _a.sent();
                    if (response.data.success) {
                        sonner_1.toast.success(response.data.message);
                        set({ loading: false });
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    sonner_1.toast.error(error_1.response.data.message);
                    set({ loading: false });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    getRestaurant: function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    set({ loading: true });
                    return [4 /*yield*/, axios_1.default.get("".concat(API_END_POINT, "/"))];
                case 1:
                    response = _a.sent();
                    if (response.data.success) {
                        set({ loading: false, restaurant: response.data.restaurant });
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    if (error_2.response.status === 404) {
                        set({ restaurant: null });
                    }
                    set({ loading: false });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    updateRestaurant: function (formData) { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    set({ loading: true });
                    return [4 /*yield*/, axios_1.default.put("".concat(API_END_POINT, "/"), formData, {
                            headers: {
                                "Content-Type": "multipart/form-data",
                            },
                        })];
                case 1:
                    response = _a.sent();
                    if (response.data.success) {
                        sonner_1.toast.success(response.data.message);
                        set({ loading: false });
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    sonner_1.toast.error(error_3.response.data.message);
                    set({ loading: false });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    searchRestaurant: function (searchText, searchQuery, selectedCuisines) { return __awaiter(void 0, void 0, void 0, function () {
        var params, response, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    set({ loading: true });
                    params = new URLSearchParams();
                    params.set("searchQuery", searchQuery);
                    params.set("selectedCuisines", selectedCuisines.join(","));
                    return [4 /*yield*/, axios_1.default.get("".concat(API_END_POINT, "/search/").concat(searchText, "?").concat(params.toString()))];
                case 1:
                    response = _a.sent();
                    if (response.data.success) {
                        set({ loading: false, searchedRestaurant: response.data });
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    set({ loading: false });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    addMenuToRestaurant: function (menu) {
        set(function (state) { return ({
            restaurant: state.restaurant
                ? __assign(__assign({}, state.restaurant), { menus: __spreadArray(__spreadArray([], state.restaurant.menus, true), [menu], false) }) : null,
        }); });
    },
    updateMenuToRestaurant: function (updatedMenu) {
        set(function (state) {
            if (state.restaurant) {
                var updatedMenuList = state.restaurant.menus.map(function (menu) {
                    return menu._id === updatedMenu._id ? updatedMenu : menu;
                });
                return {
                    restaurant: __assign(__assign({}, state.restaurant), { menus: updatedMenuList }),
                };
            }
            // if state.restaruant is undefined then return state
            return state;
        });
    },
    setAppliedFilter: function (value) {
        set(function (state) {
            var isAlreadyApplied = state.appliedFilter.includes(value);
            var updatedFilter = isAlreadyApplied
                ? state.appliedFilter.filter(function (item) { return item !== value; })
                : __spreadArray(__spreadArray([], state.appliedFilter, true), [value], false);
            return { appliedFilter: updatedFilter };
        });
    },
    resetAppliedFilter: function () {
        set({ appliedFilter: [] });
    },
    getSingleRestaurant: function (restaurantId) { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.get("".concat(API_END_POINT, "/").concat(restaurantId))];
                case 1:
                    response = _a.sent();
                    if (response.data.success) {
                        set({ singleRestaurant: response.data.restaurant });
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _a.sent();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    getRestaurantOrders: function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.get("".concat(API_END_POINT, "/order"))];
                case 1:
                    response = _a.sent();
                    if (response.data.success) {
                        set({ restaurantOrder: response.data.orders });
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_6 = _a.sent();
                    console.log(error_6);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    updateRestaurantOrder: function (orderId, status) { return __awaiter(void 0, void 0, void 0, function () {
        var response_1, updatedOrder, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.put("".concat(API_END_POINT, "/order/").concat(orderId, "/status"), { status: status }, {
                            headers: {
                                "Content-Type": "application/json",
                            },
                        })];
                case 1:
                    response_1 = _a.sent();
                    if (response_1.data.success) {
                        updatedOrder = get().restaurantOrder.map(function (order) {
                            return order._id === orderId
                                ? __assign(__assign({}, order), { status: response_1.data.status }) : order;
                        });
                        set({ restaurantOrder: updatedOrder });
                        sonner_1.toast.success(response_1.data.message);
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_7 = _a.sent();
                    sonner_1.toast.error(error_7.response.data.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); },
}); }, {
    name: "restaurant-name",
    storage: (0, middleware_1.createJSONStorage)(function () { return localStorage; }),
}));
