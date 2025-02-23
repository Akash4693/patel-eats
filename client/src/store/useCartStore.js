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
exports.useCartStore = void 0;
var zustand_1 = require("zustand");
var middleware_1 = require("zustand/middleware");
exports.useCartStore = (0, zustand_1.create)()((0, middleware_1.persist)(function (set) { return ({
    cart: [],
    addToCart: function (item) {
        set(function (state) {
            var exisitingItem = state.cart.find(function (cartItem) { return cartItem._id === item._id; });
            if (exisitingItem) {
                // already added in cart then inc qty
                return {
                    cart: state === null || state === void 0 ? void 0 : state.cart.map(function (cartItem) { return cartItem._id === item._id ? __assign(__assign({}, cartItem), { quantity: cartItem.quantity + 1 }) : cartItem; })
                };
            }
            else {
                // add cart
                return {
                    cart: __spreadArray(__spreadArray([], state.cart, true), [__assign(__assign({}, item), { quantity: 1 })], false)
                };
            }
        });
    },
    clearCart: function () {
        set({ cart: [] });
    },
    removeFromTheCart: function (id) {
        set(function (state) { return ({
            cart: state.cart.filter(function (item) { return item._id !== id; })
        }); });
    },
    incrementQuantity: function (id) {
        set(function (state) { return ({
            cart: state.cart.map(function (item) { return item._id === id ? __assign(__assign({}, item), { quantity: item.quantity + 1 }) : item; })
        }); });
    },
    decrementQuantity: function (id) {
        set(function (state) { return ({
            cart: state.cart.map(function (item) { return item._id === id && item.quantity > 1 ? __assign(__assign({}, item), { quantity: item.quantity - 1 }) : item; })
        }); });
    }
}); }, {
    name: 'cart-name',
    storage: (0, middleware_1.createJSONStorage)(function () { return localStorage; })
}));
