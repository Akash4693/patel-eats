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
var lucide_react_1 = require("lucide-react");
var avatar_1 = require("./ui/avatar");
var react_1 = require("react");
var input_1 = require("./ui/input");
var label_1 = require("./ui/label");
var button_1 = require("./ui/button");
var useUserStore_1 = require("@/store/useUserStore");
var Profile = function () {
    var _a = (0, useUserStore_1.useUserStore)(), user = _a.user, updateProfile = _a.updateProfile;
    var _b = (0, react_1.useState)(false), isLoading = _b[0], setIsLoading = _b[1];
    var _c = (0, react_1.useState)({
        fullname: (user === null || user === void 0 ? void 0 : user.fullname) || "",
        email: (user === null || user === void 0 ? void 0 : user.email) || "",
        address: (user === null || user === void 0 ? void 0 : user.address) || "",
        city: (user === null || user === void 0 ? void 0 : user.city) || "",
        country: (user === null || user === void 0 ? void 0 : user.country) || "",
        profilePicture: (user === null || user === void 0 ? void 0 : user.profilePicture) || "",
    }), profileData = _c[0], setProfileData = _c[1];
    var imageRef = (0, react_1.useRef)(null);
    var _d = (0, react_1.useState)(profileData.profilePicture || ""), selectedProfilePicture = _d[0], setSelectedProfilePicture = _d[1];
    var fileChangeHandler = function (e) {
        var _a;
        var file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            var reader_1 = new FileReader();
            reader_1.onloadend = function () {
                var result = reader_1.result;
                setSelectedProfilePicture(result);
                setProfileData(function (prevData) { return (__assign(__assign({}, prevData), { profilePicture: result })); });
            };
            reader_1.readAsDataURL(file);
        }
    };
    var changeHandler = function (e) {
        var _a;
        var _b = e.target, name = _b.name, value = _b.value;
        setProfileData(__assign(__assign({}, profileData), (_a = {}, _a[name] = value, _a)));
    };
    var updateProfileHandler = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    setIsLoading(true);
                    return [4 /*yield*/, updateProfile(profileData)];
                case 2:
                    _a.sent();
                    setIsLoading(false);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    setIsLoading(false);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return (<form onSubmit={updateProfileHandler} className="max-w-7xl mx-auto my-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <avatar_1.Avatar className="relative md:w-28 md:h-28 w-20 h-20">
            <avatar_1.AvatarImage src={selectedProfilePicture}/>
            <avatar_1.AvatarFallback>CN</avatar_1.AvatarFallback>
            <input ref={imageRef} className="hidden" type="file" accept="image/*" onChange={fileChangeHandler}/>
            <div onClick={function () { var _a; return (_a = imageRef.current) === null || _a === void 0 ? void 0 : _a.click(); }} className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 rounded-full cursor-pointer">
              <lucide_react_1.Plus className="text-white w-8 h-8"/>
            </div>
          </avatar_1.Avatar>
          <input_1.Input type="text" name="fullname" value={profileData.fullname} onChange={changeHandler} className="font-bold text-2xl outline-none border-none focus-visible:ring-transparent"/>
        </div>
      </div>
      <div className="grid md:grid-cols-4 md:gap-2 gap-3 my-10">
        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
          <lucide_react_1.Mail className="text-gray-500"/>
          <div className="w-full">
            <label_1.Label>Email</label_1.Label>
            <input disabled name="email" value={profileData.email} onChange={changeHandler} className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"/>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
          <lucide_react_1.LocateIcon className="text-gray-500"/>
          <div className="w-full">
            <label_1.Label>Address</label_1.Label>
            <input name="address" value={profileData.address} onChange={changeHandler} className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"/>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
          <lucide_react_1.MapPin className="text-gray-500"/>
          <div className="w-full">
            <label_1.Label>City</label_1.Label>
            <input name="city" value={profileData.city} onChange={changeHandler} className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"/>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
          <lucide_react_1.MapPinnedIcon className="text-gray-500"/>
          <div className="w-full">
            <label_1.Label>Country</label_1.Label>
            <input name="country" value={profileData.country} onChange={changeHandler} className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"/>
          </div>
        </div>
      </div>
      <div className="text-center">
        {isLoading ? (<button_1.Button disabled className="bg-orange hover:bg-hoverOrange">
            <lucide_react_1.Loader2 className="mr-2 w-4 h-4 animate-spin"/>
            Please wait
          </button_1.Button>) : (<button_1.Button type="submit" className="bg-orange hover:bg-hoverOrange">Update</button_1.Button>)}
      </div>
    </form>);
};
exports.default = Profile;
