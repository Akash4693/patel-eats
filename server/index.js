"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var dotenv_1 = require("dotenv");
var connectDB_1 = require("./db/connectDB");
var body_parser_1 = require("body-parser");
var cookie_parser_1 = require("cookie-parser");
var cors_1 = require("cors");
var user_route_1 = require("./routes/user.route");
var restaurant_route_1 = require("./routes/restaurant.route");
var menu_route_1 = require("./routes/menu.route");
var order_route_1 = require("./routes/order.route");
var path_1 = require("path");
dotenv_1.default.config();
var app = (0, express_1.default)();
var PORT = process.env.PORT || 3000;
var DIRNAME = path_1.default.resolve();
// default middleware for any mern project
app.use(body_parser_1.default.json({ limit: "10mb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "10mb" }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
var corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
// api
app.use("/api/v1/user", user_route_1.default);
app.use("/api/v1/restaurant", restaurant_route_1.default);
app.use("/api/v1/menu", menu_route_1.default);
app.use("/api/v1/order", order_route_1.default);
app.use(express_1.default.static(path_1.default.join(DIRNAME, "/client/dist")));
app.use("*", function (_, res) {
    res.sendFile(path_1.default.resolve(DIRNAME, "client", "dist", "index.html"));
});
app.listen(PORT, function () {
    (0, connectDB_1.default)();
    console.log("Server listen at port ".concat(PORT));
});
