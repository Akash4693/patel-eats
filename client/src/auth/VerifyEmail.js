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
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var useUserStore_1 = require("@/store/useUserStore");
var lucide_react_1 = require("lucide-react");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var VerifyEmail = function () {
    var _a = (0, react_1.useState)(["", "", "", "", "", ""]), otp = _a[0], setOtp = _a[1];
    var inputRef = (0, react_1.useRef)([]);
    var _b = (0, useUserStore_1.useUserStore)(), loading = _b.loading, verifyEmail = _b.verifyEmail;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var handleChange = function (index, value) {
        if (/^[a-zA-Z0-9]$/.test(value) || value === "") {
            var newOtp = __spreadArray([], otp, true);
            newOtp[index] = value;
            setOtp(newOtp);
        }
        // Move to the next input field id a digit is entered
        if (value !== "" && index < 5) {
            inputRef.current[index + 1].focus();
        }
    };
    var handleKeyDown = function (index, e) {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRef.current[index - 1].focus();
        }
    };
    var submitHandler = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var verificationCode, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    verificationCode = otp.join("");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, verifyEmail(verificationCode)];
                case 2:
                    _a.sent();
                    navigate("/");
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return (<div className="flex items-center justify-center h-screen w-full">
      <div className="p-8 rounded-md w-full max-w-md flex flex-col gap-10 border border-gray-200">
        <div className="text-center">
          <h1 className="font-extrabold text-2xl">Verify your email</h1>
          <p className="text-sm text-gray-600">
            Enter the 6 digit code sent to your email address
          </p>
        </div>
        <form onSubmit={submitHandler}>
          <div className="flex justify-between">
            {otp.map(function (letter, idx) { return (<input_1.Input key={idx} ref={function (element) { return (inputRef.current[idx] = element); }} type="text" maxLength={1} value={letter} onChange={function (e) {
                return handleChange(idx, e.target.value);
            }} onKeyDown={function (e) {
                return handleKeyDown(idx, e);
            }} className="md:w-12 md:h-12 w-8 h-8 text-center text-sm md:text-2xl font-normal md:font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"/>); })}
          </div>
          {loading ? (<button_1.Button disabled className="bg-orange hover:bg-hoverOrange mt-6 w-full">
              <lucide_react_1.Loader2 className="mr-2 w-4 h-4 animate-spin"/>
              Please wait
            </button_1.Button>) : (<button_1.Button className="bg-orange hover:bg-hoverOrange mt-6 w-full">
              Verify
            </button_1.Button>)}
        </form>
      </div>
    </div>);
};
exports.default = VerifyEmail;
