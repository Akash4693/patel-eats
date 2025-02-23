"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Login_1 = require("./auth/Login");
var react_router_dom_1 = require("react-router-dom");
var Signup_1 = require("./auth/Signup");
var ForgotPassword_1 = require("./auth/ForgotPassword");
var ResetPassword_1 = require("./auth/ResetPassword");
var VerifyEmail_1 = require("./auth/VerifyEmail");
var HereSection_1 = require("./components/HereSection");
var MainLayout_1 = require("./layout/MainLayout");
var Profile_1 = require("./components/Profile");
var SearchPage_1 = require("./components/SearchPage");
var RestaurantDetail_1 = require("./components/RestaurantDetail");
var Cart_1 = require("./components/Cart");
var Restaurant_1 = require("./admin/Restaurant");
var AddMenu_1 = require("./admin/AddMenu");
var Orders_1 = require("./admin/Orders");
var Success_1 = require("./components/Success");
var useUserStore_1 = require("./store/useUserStore");
var react_router_dom_2 = require("react-router-dom");
var react_1 = require("react");
var Loading_1 = require("./components/Loading");
var useThemeStore_1 = require("./store/useThemeStore");
var ProtectedRoutes = function (_a) {
    var children = _a.children;
    var _b = (0, useUserStore_1.useUserStore)(), isAuthenticated = _b.isAuthenticated, user = _b.user;
    if (!isAuthenticated) {
        return <react_router_dom_2.Navigate to="/login" replace/>;
    }
    if (!(user === null || user === void 0 ? void 0 : user.isVerified)) {
        return <react_router_dom_2.Navigate to="/verify-email" replace/>;
    }
    return children;
};
var AuthenticatedUser = function (_a) {
    var children = _a.children;
    var _b = (0, useUserStore_1.useUserStore)(), isAuthenticated = _b.isAuthenticated, user = _b.user;
    if (isAuthenticated && (user === null || user === void 0 ? void 0 : user.isVerified)) {
        return <react_router_dom_2.Navigate to="/" replace/>;
    }
    return children;
};
var AdminRoute = function (_a) {
    var children = _a.children;
    var _b = (0, useUserStore_1.useUserStore)(), user = _b.user, isAuthenticated = _b.isAuthenticated;
    if (!isAuthenticated) {
        return <react_router_dom_2.Navigate to="/login" replace/>;
    }
    if (!(user === null || user === void 0 ? void 0 : user.admin)) {
        return <react_router_dom_2.Navigate to="/" replace/>;
    }
    return children;
};
var appRouter = (0, react_router_dom_1.createBrowserRouter)([
    {
        path: "/",
        element: (<ProtectedRoutes>
        <MainLayout_1.default />
      </ProtectedRoutes>),
        children: [
            {
                path: "/",
                element: <HereSection_1.default />,
            },
            {
                path: "/profile",
                element: <Profile_1.default />,
            },
            {
                path: "/search/:text",
                element: <SearchPage_1.default />,
            },
            {
                path: "/restaurant/:id",
                element: <RestaurantDetail_1.default />,
            },
            {
                path: "/cart",
                element: <Cart_1.default />,
            },
            {
                path: "/order/status",
                element: <Success_1.default />,
            },
            // admin services start from here
            {
                path: "/admin/restaurant",
                element: <AdminRoute><Restaurant_1.default /></AdminRoute>,
            },
            {
                path: "/admin/menu",
                element: <AdminRoute><AddMenu_1.default /></AdminRoute>,
            },
            {
                path: "/admin/orders",
                element: <AdminRoute><Orders_1.default /></AdminRoute>,
            },
        ],
    },
    {
        path: "/login",
        element: <AuthenticatedUser><Login_1.default /></AuthenticatedUser>,
    },
    {
        path: "/signup",
        element: <AuthenticatedUser><Signup_1.default /></AuthenticatedUser>,
    },
    {
        path: "/forgot-password",
        element: <AuthenticatedUser><ForgotPassword_1.default /></AuthenticatedUser>,
    },
    {
        path: "/reset-password",
        element: <ResetPassword_1.default />,
    },
    {
        path: "/verify-email",
        element: <VerifyEmail_1.default />,
    },
]);
function App() {
    var initializeTheme = (0, useThemeStore_1.useThemeStore)(function (state) { return state.initializeTheme; });
    var _a = (0, useUserStore_1.useUserStore)(), checkAuthentication = _a.checkAuthentication, isCheckingAuth = _a.isCheckingAuth;
    // checking auth every time when page is loaded
    (0, react_1.useEffect)(function () {
        checkAuthentication();
        initializeTheme();
    }, [checkAuthentication]);
    if (isCheckingAuth)
        return <Loading_1.default />;
    return (<main>
      <react_router_dom_1.RouterProvider router={appRouter}></react_router_dom_1.RouterProvider>
    </main>);
}
exports.default = App;
