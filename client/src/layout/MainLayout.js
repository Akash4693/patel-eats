"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Footer_1 = require("@/components/Footer");
var Navbar_1 = require("@/components/Navbar");
var react_router_dom_1 = require("react-router-dom");
var MainLayout = function () {
    return (<div className="flex flex-col min-h-screen m-2 md:m-0">
        {/* Navbar  */}
        <header>
            <Navbar_1.default />
        </header>
        {/* Main content  */} 
        <div className="flex-1">
            <react_router_dom_1.Outlet />
        </div>

        {/* Footer  */}
        <footer>
            <Footer_1.default />
        </footer>
    </div>);
};
exports.default = MainLayout;
