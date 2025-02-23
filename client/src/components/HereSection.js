"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var input_1 = require("./ui/input");
var lucide_react_1 = require("lucide-react");
var button_1 = require("./ui/button");
var hero_pizza_png_1 = require("@/assets/hero_pizza.png");
var react_router_dom_1 = require("react-router-dom");
var HereSection = function () {
    var _a = (0, react_1.useState)(""), searchText = _a[0], setSearchText = _a[1];
    var navigate = (0, react_router_dom_1.useNavigate)();
    return (<div className="flex flex-col md:flex-row max-w-7xl mx-auto md:p-10 rounded-lg items-center justify-center m-4 gap-20">
      <div className="flex flex-col gap-10 md:w-[40%]">
        <div className="flex flex-col gap-5">
          <h1 className="font-bold md:font-extrabold md:text-5xl text-4xl">
            Order Food anytime & anywhere
          </h1>
          <p className="text-gray-500">
            Hey! Our Delicios food is waiting for you, we are always near to
            you.
          </p>
        </div>
        <div className="relative flex items-center gap-2">
          <input_1.Input type="text" value={searchText} placeholder="Search restaurant by name, city & country" onChange={function (e) { return setSearchText(e.target.value); }} className="pl-10 shadow-lg"/>
          <lucide_react_1.Search className="text-gray-500 absolute inset-y-2 left-2"/>
          <button_1.Button onClick={function () { return navigate("/search/".concat(searchText)); }} className="bg-orange hover:bg-hoverOrange">Search</button_1.Button>
        </div>
      </div>
      <div>
        <img src={hero_pizza_png_1.default} alt="" className="object-cover w-full max-h-[500px]"/>
      </div>
    </div>);
};
exports.default = HereSection;
