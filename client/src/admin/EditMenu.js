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
var dialog_1 = require("@/components/ui/dialog");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var menuSchema_1 = require("@/schema/menuSchema");
var useMenuStore_1 = require("@/store/useMenuStore");
var lucide_react_1 = require("lucide-react");
var react_1 = require("react");
var EditMenu = function (_a) {
    var _b;
    var selectedMenu = _a.selectedMenu, editOpen = _a.editOpen, setEditOpen = _a.setEditOpen;
    var _c = (0, react_1.useState)({
        name: "",
        description: "",
        price: 0,
        image: undefined,
    }), input = _c[0], setInput = _c[1];
    var _d = (0, react_1.useState)({}), error = _d[0], setError = _d[1];
    var _e = (0, useMenuStore_1.useMenuStore)(), loading = _e.loading, editMenu = _e.editMenu;
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
                    result = menuSchema_1.menuSchema.safeParse(input);
                    if (!result.success) {
                        fieldErrors = result.error.formErrors.fieldErrors;
                        setError(fieldErrors);
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    formData = new FormData();
                    formData.append("name", input.name);
                    formData.append("description", input.description);
                    formData.append("price", input.price.toString());
                    if (input.image) {
                        formData.append("image", input.image);
                    }
                    return [4 /*yield*/, editMenu(selectedMenu._id, formData)];
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
    (0, react_1.useEffect)(function () {
        setInput({
            name: (selectedMenu === null || selectedMenu === void 0 ? void 0 : selectedMenu.name) || "",
            description: (selectedMenu === null || selectedMenu === void 0 ? void 0 : selectedMenu.description) || "",
            price: (selectedMenu === null || selectedMenu === void 0 ? void 0 : selectedMenu.price) || 0,
            image: undefined,
        });
    }, [selectedMenu]);
    return (<dialog_1.Dialog open={editOpen} onOpenChange={setEditOpen}>
      <dialog_1.DialogContent>
        <dialog_1.DialogHeader>
          <dialog_1.DialogTitle>Edit Menu</dialog_1.DialogTitle>
          <dialog_1.DialogDescription>
            Update your menu to keep your offerings fresh and exciting!
          </dialog_1.DialogDescription>
        </dialog_1.DialogHeader>
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label_1.Label>Name</label_1.Label>
            <input_1.Input type="text" name="name" value={input.name} onChange={changeEventHandler} placeholder="Enter menu name"/>
            {error && <span className="text-xs font-medium text-red-600">{error.name}</span>}
          </div>
          <div>
            <label_1.Label>Description</label_1.Label>
            <input_1.Input type="text" name="description" value={input.description} onChange={changeEventHandler} placeholder="Enter menu description"/>
            {error && <span className="text-xs font-medium text-red-600">{error.description}</span>}
          </div>
          <div>
            <label_1.Label>Price in (Rupees)</label_1.Label>
            <input_1.Input type="number" name="price" value={input.price} onChange={changeEventHandler} placeholder="Enter menu price"/>
            {error && <span className="text-xs font-medium text-red-600">{error.price}</span>}
          </div>
          <div>
            <label_1.Label>Upload Menu Image</label_1.Label>
            <input_1.Input type="file" name="image" onChange={function (e) { var _a; return setInput(__assign(__assign({}, input), { image: ((_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0]) || undefined })); }}/>
            {error && <span className="text-xs font-medium text-red-600">{(_b = error.image) === null || _b === void 0 ? void 0 : _b.name}</span>}
          </div>
          <dialog_1.DialogFooter className="mt-5">
            {loading ? (<button_1.Button disabled className="bg-orange hover:bg-hoverOrange">
                <lucide_react_1.Loader2 className="mr-2 w-4 h-4 animate-spin"/>
                Please wait
              </button_1.Button>) : (<button_1.Button className="bg-orange hover:bg-hoverOrange">Submit</button_1.Button>)}
          </dialog_1.DialogFooter>
        </form>
      </dialog_1.DialogContent>
    </dialog_1.Dialog>);
};
exports.default = EditMenu;
