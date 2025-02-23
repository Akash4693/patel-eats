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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var dialog_1 = require("./ui/dialog");
var react_dialog_1 = require("@radix-ui/react-dialog");
var label_1 = require("./ui/label");
var input_1 = require("./ui/input");
var button_1 = require("./ui/button");
var useUserStore_1 = require("@/store/useUserStore");
var useCartStore_1 = require("@/store/useCartStore");
var useRestaurantStore_1 = require("@/store/useRestaurantStore");
var useOrderStore_1 = require("@/store/useOrderStore");
var lucide_react_1 = require("lucide-react");
var CheckoutConfirmPage = function (_a) {
    var open = _a.open, setOpen = _a.setOpen;
    var user = (0, useUserStore_1.useUserStore)().user;
    var _b = (0, react_1.useState)({
        name: (user === null || user === void 0 ? void 0 : user.fullname) || "",
        email: (user === null || user === void 0 ? void 0 : user.email) || "",
        contact: (user === null || user === void 0 ? void 0 : user.contact.toString()) || "",
        address: (user === null || user === void 0 ? void 0 : user.address) || "",
        city: (user === null || user === void 0 ? void 0 : user.city) || "",
        country: (user === null || user === void 0 ? void 0 : user.country) || "",
    }), input = _b[0], setInput = _b[1];
    var cart = (0, useCartStore_1.useCartStore)().cart;
    var restaurant = (0, useRestaurantStore_1.useRestaurantStore)().restaurant;
    var _c = (0, useOrderStore_1.useOrderStore)(), createCheckoutSession = _c.createCheckoutSession, loading = _c.loading;
    var changeEventHandler = function (e) {
        var _a;
        var _b = e.target, name = _b.name, value = _b.value;
        setInput(__assign(__assign({}, input), (_a = {}, _a[name] = value, _a)));
    };
    var checkoutHandler = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var checkoutData, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    checkoutData = {
                        cartItems: cart.map(function (cartItem) { return ({
                            menuId: cartItem._id,
                            name: cartItem.name,
                            image: cartItem.image,
                            price: cartItem.price.toString(),
                            quantity: cartItem.quantity.toString(),
                        }); }),
                        deliveryDetails: input,
                        restaurantId: restaurant === null || restaurant === void 0 ? void 0 : restaurant._id,
                    };
                    return [4 /*yield*/, createCheckoutSession(checkoutData)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return (<dialog_1.Dialog open={open} onOpenChange={setOpen}>
      <dialog_1.DialogContent>
        <react_dialog_1.DialogTitle className="font-semibold">Review Your Order</react_dialog_1.DialogTitle>
        <dialog_1.DialogDescription className="text-xs">
          Double-check your delivery details and ensure everything is in order.
          When you are ready, hit confirm button to finalize your order
        </dialog_1.DialogDescription>
        <form onSubmit={checkoutHandler} className="md:grid grid-cols-2 gap-2 space-y-1 md:space-y-0">
          <div>
            <label_1.Label>Fullname</label_1.Label>
            <input_1.Input type="text" name="name" value={input.name} onChange={changeEventHandler}/>
          </div>
          <div>
            <label_1.Label>Email</label_1.Label>
            <input_1.Input disabled type="email" name="email" value={input.email} onChange={changeEventHandler}/>
          </div>
          <div>
            <label_1.Label>Contact</label_1.Label>
            <input_1.Input type="text" name="contact" value={input.contact} onChange={changeEventHandler}/>
          </div>
          <div>
            <label_1.Label>Address</label_1.Label>
            <input_1.Input type="text" name="address" value={input.address} onChange={changeEventHandler}/>
          </div>
          <div>
            <label_1.Label>City</label_1.Label>
            <input_1.Input type="text" name="city" value={input.city} onChange={changeEventHandler}/>
          </div>
          <div>
            <label_1.Label>Country</label_1.Label>
            <input_1.Input type="text" name="country" value={input.country} onChange={changeEventHandler}/>
          </div>
          <dialog_1.DialogFooter className="col-span-2 pt-5">
            {loading ? (<button_1.Button disabled className="bg-orange hover:bg-hoverOrange">
                <lucide_react_1.Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                Please wait
              </button_1.Button>) : (<button_1.Button className="bg-orange hover:bg-hoverOrange">
                Continue To Payment
              </button_1.Button>)}
          </dialog_1.DialogFooter>
        </form>
      </dialog_1.DialogContent>
    </dialog_1.Dialog>);
};
exports.default = CheckoutConfirmPage;
