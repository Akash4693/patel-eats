"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var multer_1 = require("../middlewares/multer");
var isAuthenticated_1 = require("../middlewares/isAuthenticated");
var menu_controller_1 = require("../controller/menu.controller");
var router = express_1.default.Router();
router.route("/").post(isAuthenticated_1.isAuthenticated, multer_1.default.single("image"), menu_controller_1.addMenu);
router.route("/:id").put(isAuthenticated_1.isAuthenticated, multer_1.default.single("image"), menu_controller_1.editMenu);
exports.default = router;
