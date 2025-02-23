"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var lucide_react_1 = require("lucide-react");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var ForgotPassword = function () {
    var _a = (0, react_1.useState)(""), email = _a[0], setEmail = _a[1];
    var loading = false;
    return (<div className="flex items-center justify-center min-h-screen w-full">
      <form className="flex flex-col gap-5 md:p-8 w-full max-w-md rounded-lg mx-4">
        <div className="text-center">
          <h1 className="font-extrabold text-2xl mb-2">Forgot Password</h1>
          <p className="text-sm text-gray-600">Enter your email address to reset your password</p>
        </div>
        <div className="relative w-full">
            <input_1.Input type="text" value={email} onChange={function (e) { return setEmail(e.target.value); }} placeholder="Enter your email" className="pl-10"/>
            <lucide_react_1.Mail className="absolute inset-y-2 left-2 text-gray-600 pointer-events-none"/>
        </div>
        {loading ? (<button_1.Button disabled className="bg-orange hover:bg-hoverOrange"><lucide_react_1.Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please wait</button_1.Button>) : (<button_1.Button className="bg-orange hover:bg-hoverOrange">Send Reset Link</button_1.Button>)}
        <span className="text-center">
            Back to{" "}
            <react_router_dom_1.Link to="/login" className="text-blue-500">Login</react_router_dom_1.Link>
        </span>
      </form>
    </div>);
};
exports.default = ForgotPassword;
