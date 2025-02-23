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
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var restaurantSchema_1 = require("@/schema/restaurantSchema");
var useRestaurantStore_1 = require("@/store/useRestaurantStore");
var lucide_react_1 = require("lucide-react");
var react_1 = require("react");
var Restaurant = function () {
    var _a;
    var _b = (0, react_1.useState)({
        restaurantName: "",
        city: "",
        country: "",
        deliveryTime: 0,
        cuisines: [],
        imageFile: undefined,
    }), input = _b[0], setInput = _b[1];
    var _c = (0, react_1.useState)({}), errors = _c[0], setErrors = _c[1];
    var _d = (0, useRestaurantStore_1.useRestaurantStore)(), loading = _d.loading, restaurant = _d.restaurant, updateRestaurant = _d.updateRestaurant, createRestaurant = _d.createRestaurant, getRestaurant = _d.getRestaurant;
    var changeEventHandler = function (e) {
        var _a;
        var _b = e.target, name = _b.name, value = _b.value, type = _b.type;
        setInput(__assign(__assign({}, input), (_a = {}, _a[name] = type === "number" ? Number(value) : value, _a)));
    };
    var submitHandler = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var result, fieldErrors, formData, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    result = restaurantSchema_1.restaurantFromSchema.safeParse(input);
                    if (!result.success) {
                        fieldErrors = result.error.formErrors.fieldErrors;
                        setErrors(fieldErrors);
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    formData = new FormData();
                    formData.append("restaurantName", input.restaurantName);
                    formData.append("city", input.city);
                    formData.append("country", input.country);
                    formData.append("deliveryTime", input.deliveryTime.toString());
                    formData.append("cuisines", JSON.stringify(input.cuisines));
                    if (input.imageFile) {
                        formData.append("imageFile", input.imageFile);
                    }
                    if (!restaurant) return [3 /*break*/, 3];
                    // update
                    return [4 /*yield*/, updateRestaurant(formData)];
                case 2:
                    // update
                    _a.sent();
                    return [3 /*break*/, 5];
                case 3: 
                // create
                return [4 /*yield*/, createRestaurant(formData)];
                case 4:
                    // create
                    _a.sent();
                    _a.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); };
    (0, react_1.useEffect)(function () {
        var fetchRestaurant = function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getRestaurant()];
                    case 1:
                        _a.sent();
                        if (restaurant) {
                            setInput({
                                restaurantName: restaurant.restaurantName || "",
                                city: restaurant.city || "",
                                country: restaurant.country || "",
                                deliveryTime: restaurant.deliveryTime || 0,
                                cuisines: restaurant.cuisines
                                    ? restaurant.cuisines.map(function (cuisine) { return cuisine; })
                                    : [],
                                imageFile: undefined,
                            });
                        }
                        ;
                        return [2 /*return*/];
                }
            });
        }); };
        fetchRestaurant();
        console.log(restaurant);
    }, []);
    return (<div className="max-w-6xl mx-auto my-10">
      <div>
        <div>
          <h1 className="font-extrabold text-2xl mb-5">Add Restaurants</h1>
          <form onSubmit={submitHandler}>
            <div className="md:grid grid-cols-2 gap-6 space-y-2 md:space-y-0">
              {/* Restaurant Name  */}
              <div>
                <label_1.Label>Restaurant Name</label_1.Label>
                <input_1.Input type="text" name="restaurantName" value={input.restaurantName} onChange={changeEventHandler} placeholder="Enter your restaurant name"/>
                {errors && (<span className="text-xs text-red-600 font-medium">
                    {errors.restaurantName}
                  </span>)}
              </div>
              <div>
                <label_1.Label>City</label_1.Label>
                <input_1.Input type="text" name="city" value={input.city} onChange={changeEventHandler} placeholder="Enter your city name"/>
                {errors && (<span className="text-xs text-red-600 font-medium">
                    {errors.city}
                  </span>)}
              </div>
              <div>
                <label_1.Label>Country</label_1.Label>
                <input_1.Input type="text" name="country" value={input.country} onChange={changeEventHandler} placeholder="Enter your country name"/>
                {errors && (<span className="text-xs text-red-600 font-medium">
                    {errors.country}
                  </span>)}
              </div>
              <div>
                <label_1.Label>Delivery Time</label_1.Label>
                <input_1.Input type="number" name="deliveryTime" value={input.deliveryTime} onChange={changeEventHandler} placeholder="Enter your delivery time"/>
                {errors && (<span className="text-xs text-red-600 font-medium">
                    {errors.deliveryTime}
                  </span>)}
              </div>
              <div>
                <label_1.Label>Cuisines</label_1.Label>
                <input_1.Input type="text" name="cuisines" value={input.cuisines} onChange={function (e) {
            return setInput(__assign(__assign({}, input), { cuisines: e.target.value.split(",") }));
        }} placeholder="e.g. Momos, Biryani"/>
                {errors && (<span className="text-xs text-red-600 font-medium">
                    {errors.cuisines}
                  </span>)}
              </div>
              <div>
                <label_1.Label>Upload Restaurant Banner</label_1.Label>
                <input_1.Input onChange={function (e) {
            var _a;
            return setInput(__assign(__assign({}, input), { imageFile: ((_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0]) || undefined }));
        }} type="file" accept="image/*" name="imageFile"/>
                {errors && (<span className="text-xs text-red-600 font-medium">
                    {(_a = errors.imageFile) === null || _a === void 0 ? void 0 : _a.name}
                  </span>)}
              </div>
            </div>
            <div className="my-5 w-fit">
              {loading ? (<button_1.Button disabled className="bg-orange hover:bg-hoverOrange">
                  <lucide_react_1.Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                  Please wait
                </button_1.Button>) : (<button_1.Button className="bg-orange hover:bg-hoverOrange">
                  {restaurant
                ? "Update Your Restaurant"
                : "Add Your Restaurant"}
                </button_1.Button>)}
            </div>
          </form>
        </div>
      </div>
    </div>);
};
exports.default = Restaurant;
