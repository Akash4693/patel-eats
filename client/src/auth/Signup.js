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
var separator_1 = require("@/components/ui/separator");
var userSchema_1 = require("@/schema/userSchema");
var useUserStore_1 = require("@/store/useUserStore");
var lucide_react_1 = require("lucide-react");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
// typescript me type define krne ka 2 trika hota hai
var Signup = function () {
    var _a = (0, react_1.useState)({
        fullname: "",
        email: "",
        password: "",
        contact: "",
    }), input = _a[0], setInput = _a[1];
    var _b = (0, react_1.useState)({}), errors = _b[0], setErrors = _b[1];
    var _c = (0, useUserStore_1.useUserStore)(), signup = _c.signup, loading = _c.loading;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var changeEventHandler = function (e) {
        var _a;
        var _b = e.target, name = _b.name, value = _b.value;
        setInput(__assign(__assign({}, input), (_a = {}, _a[name] = value, _a)));
    };
    var loginSubmitHandler = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var result, fieldErrors, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    result = userSchema_1.userSignupSchema.safeParse(input);
                    if (!result.success) {
                        fieldErrors = result.error.formErrors.fieldErrors;
                        setErrors(fieldErrors);
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, signup(input)];
                case 2:
                    _a.sent();
                    navigate("/verify-email");
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return (<div className="flex items-center justify-center min-h-screen">
      <form onSubmit={loginSubmitHandler} className="md:p-8 w-full max-w-md rounded-lg md:border border-gray-200 mx-4">
        <div className="mb-4">
          <h1 className="font-bold text-2xl">PatelEats</h1>
        </div>
        <div className="mb-4">
          <div className="relative">
            <input_1.Input type="text" placeholder="Full Name" name="fullname" value={input.fullname} onChange={changeEventHandler} className="pl-10 focus-visible:ring-1"/>
            <lucide_react_1.User className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none"/>
            {errors && <span className="text-xs text-red-500">{errors.fullname}</span>}
          </div>
        </div>
        <div className="mb-4">
          <div className="relative">
            <input_1.Input type="email" placeholder="Email" name="email" value={input.email} onChange={changeEventHandler} className="pl-10 focus-visible:ring-1"/>
            <lucide_react_1.Mail className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none"/>
            {errors && <span className="text-xs text-red-500">{errors.email}</span>}
          </div>
        </div>
        <div className="mb-4">
          <div className="relative">
            <input_1.Input type="password" placeholder="Password" name="password" value={input.password} onChange={changeEventHandler} className="pl-10 focus-visible:ring-1"/>
            <lucide_react_1.LockKeyhole className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none"/>
            {errors && <span className="text-xs text-red-500">{errors.password}</span>}
          </div>
        </div>
        <div className="mb-4">
          <div className="relative">
            <input_1.Input type="text" placeholder="Contact" name="contact" value={input.contact} onChange={changeEventHandler} className="pl-10 focus-visible:ring-1"/>
            <lucide_react_1.PhoneOutgoing className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none"/>
            {errors && <span className="text-xs text-red-500">{errors.contact}</span>}
          </div>
        </div>
        <div className="mb-10">
          {loading ? (<button_1.Button disabled className="w-full bg-orange hover:bg-hoverOrange">
              <lucide_react_1.Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please wait
            </button_1.Button>) : (<button_1.Button type="submit" className="w-full bg-orange hover:bg-hoverOrange">
              Signup
            </button_1.Button>)}
        </div>
        <separator_1.Separator />
        <p className="mt-2">
            Already have an account?{" "}
            <react_router_dom_1.Link to="/login" className="text-blue-500">Login</react_router_dom_1.Link>
        </p>
      </form>
    </div>);
};
exports.default = Signup;
