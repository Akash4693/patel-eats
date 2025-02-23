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
exports.createLineItems = exports.stripeWebhook = exports.createCheckoutSession = exports.getOrders = void 0;
var restaurant_model_1 = require("../models/restaurant.model");
var order_model_1 = require("../models/order.model");
var stripe_1 = require("stripe");
var stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY);
var getOrders = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orders, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, order_model_1.Order.find({ user: req.id }).populate('user').populate('restaurant')];
            case 1:
                orders = _a.sent();
                return [2 /*return*/, res.status(200).json({
                        success: true,
                        orders: orders
                    })];
            case 2:
                error_1 = _a.sent();
                console.log(error_1);
                return [2 /*return*/, res.status(500).json({ success: false, message: "Internal server error" })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getOrders = getOrders;
var createCheckoutSession = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var checkoutSessionRequest, restaurant, order, menuItems, lineItems, session, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                checkoutSessionRequest = req.body;
                return [4 /*yield*/, restaurant_model_1.Restaurant.findById(checkoutSessionRequest.restaurantId).populate('menus')];
            case 1:
                restaurant = _a.sent();
                if (!restaurant) {
                    return [2 /*return*/, res.status(404).json({
                            success: false,
                            message: "Restaurant not found."
                        })];
                }
                ;
                order = new order_model_1.Order({
                    restaurant: restaurant._id,
                    user: req.id,
                    deliveryDetails: checkoutSessionRequest.deliveryDetails,
                    cartItems: checkoutSessionRequest.cartItems,
                    status: "pending"
                });
                menuItems = restaurant.menus;
                lineItems = (0, exports.createLineItems)(checkoutSessionRequest, menuItems);
                return [4 /*yield*/, stripe.checkout.sessions.create({
                        payment_method_types: ['card'],
                        shipping_address_collection: {
                            allowed_countries: ['GB', 'US', 'CA']
                        },
                        line_items: lineItems,
                        mode: 'payment',
                        success_url: "".concat(process.env.FRONTEND_URL, "/order/status"),
                        cancel_url: "".concat(process.env.FRONTEND_URL, "/cart"),
                        metadata: {
                            orderId: order._id.toString(),
                            images: JSON.stringify(menuItems.map(function (item) { return item.image; }))
                        }
                    })];
            case 2:
                session = _a.sent();
                if (!session.url) {
                    return [2 /*return*/, res.status(400).json({ success: false, message: "Error while creating session" })];
                }
                return [4 /*yield*/, order.save()];
            case 3:
                _a.sent();
                return [2 /*return*/, res.status(200).json({
                        session: session
                    })];
            case 4:
                error_2 = _a.sent();
                console.log(error_2);
                return [2 /*return*/, res.status(500).json({ message: "Internal server error" })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.createCheckoutSession = createCheckoutSession;
var stripeWebhook = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var event, signature, payloadString, secret, header, session, order, error_3;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                try {
                    signature = req.headers["stripe-signature"];
                    payloadString = JSON.stringify(req.body, null, 2);
                    secret = process.env.WEBHOOK_ENDPOINT_SECRET;
                    header = stripe.webhooks.generateTestHeaderString({
                        payload: payloadString,
                        secret: secret,
                    });
                    // Construct the event using the payload string and header
                    event = stripe.webhooks.constructEvent(payloadString, header, secret);
                }
                catch (error) {
                    console.error('Webhook error:', error.message);
                    return [2 /*return*/, res.status(400).send("Webhook error: ".concat(error.message))];
                }
                if (!(event.type === "checkout.session.completed")) return [3 /*break*/, 5];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                session = event.data.object;
                return [4 /*yield*/, order_model_1.Order.findById((_a = session.metadata) === null || _a === void 0 ? void 0 : _a.orderId)];
            case 2:
                order = _b.sent();
                if (!order) {
                    return [2 /*return*/, res.status(404).json({ message: "Order not found" })];
                }
                // Update the order with the amount and status
                if (session.amount_total) {
                    order.totalAmount = session.amount_total;
                }
                order.status = "confirmed";
                return [4 /*yield*/, order.save()];
            case 3:
                _b.sent();
                return [3 /*break*/, 5];
            case 4:
                error_3 = _b.sent();
                console.error('Error handling event:', error_3);
                return [2 /*return*/, res.status(500).json({ message: "Internal Server Error" })];
            case 5:
                // Send a 200 response to acknowledge receipt of the event
                res.status(200).send();
                return [2 /*return*/];
        }
    });
}); };
exports.stripeWebhook = stripeWebhook;
var createLineItems = function (checkoutSessionRequest, menuItems) {
    // 1. create line items
    var lineItems = checkoutSessionRequest.cartItems.map(function (cartItem) {
        var menuItem = menuItems.find(function (item) { return item._id.toString() === cartItem.menuId; });
        if (!menuItem)
            throw new Error("Menu item id not found");
        return {
            price_data: {
                currency: 'inr',
                product_data: {
                    name: menuItem.name,
                    images: [menuItem.image],
                },
                unit_amount: menuItem.price * 100
            },
            quantity: cartItem.quantity,
        };
    });
    // 2. return lineItems
    return lineItems;
};
exports.createLineItems = createLineItems;
