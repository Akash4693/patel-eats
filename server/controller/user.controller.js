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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.checkAuth = exports.resetPassword = exports.forgotPassword = exports.logout = exports.verifyEmail = exports.login = exports.signup = void 0;
var user_model_1 = require("../models/user.model");
var bcryptjs_1 = require("bcryptjs");
var crypto_1 = require("crypto");
var cloudinary_1 = require("../utils/cloudinary");
var generateVerificationCode_1 = require("../utils/generateVerificationCode");
var generateToken_1 = require("../utils/generateToken");
var email_1 = require("../mailtrap/email");
var signup = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, fullname, email, password, contact, user, hashedPassword, verificationToken, userWithoutPassword, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 6, , 7]);
                _a = req.body, fullname = _a.fullname, email = _a.email, password = _a.password, contact = _a.contact;
                return [4 /*yield*/, user_model_1.User.findOne({ email: email })];
            case 1:
                user = _b.sent();
                if (user) {
                    return [2 /*return*/, res.status(400).json({
                            success: false,
                            message: "User already exist with this email"
                        })];
                }
                return [4 /*yield*/, bcryptjs_1.default.hash(password, 10)];
            case 2:
                hashedPassword = _b.sent();
                verificationToken = (0, generateVerificationCode_1.generateVerificationCode)();
                return [4 /*yield*/, user_model_1.User.create({
                        fullname: fullname,
                        email: email,
                        password: hashedPassword,
                        contact: Number(contact),
                        verificationToken: verificationToken,
                        verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
                    })];
            case 3:
                user = _b.sent();
                (0, generateToken_1.generateToken)(res, user);
                return [4 /*yield*/, (0, email_1.sendVerificationEmail)(email, verificationToken)];
            case 4:
                _b.sent();
                return [4 /*yield*/, user_model_1.User.findOne({ email: email }).select("-password")];
            case 5:
                userWithoutPassword = _b.sent();
                return [2 /*return*/, res.status(201).json({
                        success: true,
                        message: "Account created successfully",
                        user: userWithoutPassword
                    })];
            case 6:
                error_1 = _b.sent();
                console.log(error_1);
                return [2 /*return*/, res.status(500).json({ message: "Internal server error" })];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.signup = signup;
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, isPasswordMatch, userWithoutPassword, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, user_model_1.User.findOne({ email: email })];
            case 1:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, res.status(400).json({
                            success: false,
                            message: "Incorrect email or password"
                        })];
                }
                return [4 /*yield*/, bcryptjs_1.default.compare(password, user.password)];
            case 2:
                isPasswordMatch = _b.sent();
                if (!isPasswordMatch) {
                    return [2 /*return*/, res.status(400).json({
                            success: false,
                            message: "Incorrect email or password"
                        })];
                }
                (0, generateToken_1.generateToken)(res, user);
                user.lastLogin = new Date();
                return [4 /*yield*/, user.save()];
            case 3:
                _b.sent();
                return [4 /*yield*/, user_model_1.User.findOne({ email: email }).select("-password")];
            case 4:
                userWithoutPassword = _b.sent();
                return [2 /*return*/, res.status(200).json({
                        success: true,
                        message: "Welcome back ".concat(user.fullname),
                        user: userWithoutPassword
                    })];
            case 5:
                error_2 = _b.sent();
                console.log(error_2);
                return [2 /*return*/, res.status(500).json({ message: "Internal server error" })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
var verifyEmail = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var verificationCode, user, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                verificationCode = req.body.verificationCode;
                return [4 /*yield*/, user_model_1.User.findOne({ verificationToken: verificationCode, verificationTokenExpiresAt: { $gt: Date.now() } }).select("-password")];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(400).json({
                            success: false,
                            message: "Invalid or expired verification token"
                        })];
                }
                user.isVerified = true;
                user.verificationToken = undefined;
                user.verificationTokenExpiresAt = undefined;
                return [4 /*yield*/, user.save()];
            case 2:
                _a.sent();
                // send welcome email
                return [4 /*yield*/, (0, email_1.sendWelcomeEmail)(user.email, user.fullname)];
            case 3:
                // send welcome email
                _a.sent();
                return [2 /*return*/, res.status(200).json({
                        success: true,
                        message: "Email verified successfully.",
                        user: user,
                    })];
            case 4:
                error_3 = _a.sent();
                console.log(error_3);
                return [2 /*return*/, res.status(500).json({ message: "Internal server error" })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.verifyEmail = verifyEmail;
var logout = function (_, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            return [2 /*return*/, res.clearCookie("token").status(200).json({
                    success: true,
                    message: "Logged out successfully."
                })];
        }
        catch (error) {
            console.log(error);
            return [2 /*return*/, res.status(500).json({ message: "Internal server error" })];
        }
        return [2 /*return*/];
    });
}); };
exports.logout = logout;
var forgotPassword = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, user, resetToken, resetTokenExpiresAt, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                email = req.body.email;
                return [4 /*yield*/, user_model_1.User.findOne({ email: email })];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(400).json({
                            success: false,
                            message: "User doesn't exist"
                        })];
                }
                resetToken = crypto_1.default.randomBytes(40).toString('hex');
                resetTokenExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000);
                user.resetPasswordToken = resetToken;
                user.resetPasswordTokenExpiresAt = resetTokenExpiresAt;
                return [4 /*yield*/, user.save()];
            case 2:
                _a.sent();
                // send email
                return [4 /*yield*/, (0, email_1.sendPasswordResetEmail)(user.email, "".concat(process.env.FRONTEND_URL, "/resetpassword/").concat(resetToken))];
            case 3:
                // send email
                _a.sent();
                return [2 /*return*/, res.status(200).json({
                        success: true,
                        message: "Password reset link sent to your email"
                    })];
            case 4:
                error_4 = _a.sent();
                console.error(error_4);
                return [2 /*return*/, res.status(500).json({ message: "Internal server error" })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.forgotPassword = forgotPassword;
var resetPassword = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, newPassword, user, hashedPassword, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                token = req.params.token;
                newPassword = req.body.newPassword;
                return [4 /*yield*/, user_model_1.User.findOne({ resetPasswordToken: token, resetPasswordTokenExpiresAt: { $gt: Date.now() } })];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(400).json({
                            success: false,
                            message: "Invalid or expired reset token"
                        })];
                }
                return [4 /*yield*/, bcryptjs_1.default.hash(newPassword, 10)];
            case 2:
                hashedPassword = _a.sent();
                user.password = hashedPassword;
                user.resetPasswordToken = undefined;
                user.resetPasswordTokenExpiresAt = undefined;
                return [4 /*yield*/, user.save()];
            case 3:
                _a.sent();
                // send success reset email
                return [4 /*yield*/, (0, email_1.sendResetSuccessEmail)(user.email)];
            case 4:
                // send success reset email
                _a.sent();
                return [2 /*return*/, res.status(200).json({
                        success: true,
                        message: "Password reset successfully."
                    })];
            case 5:
                error_5 = _a.sent();
                console.error(error_5);
                return [2 /*return*/, res.status(500).json({ message: "Internal server error" })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.resetPassword = resetPassword;
var checkAuth = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = req.id;
                return [4 /*yield*/, user_model_1.User.findById(userId).select("-password")];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({
                            success: false,
                            message: 'User not found'
                        })];
                }
                ;
                return [2 /*return*/, res.status(200).json({
                        success: true,
                        user: user
                    })];
            case 2:
                error_6 = _a.sent();
                console.error(error_6);
                return [2 /*return*/, res.status(500).json({ message: "Internal server error" })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.checkAuth = checkAuth;
var updateProfile = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, _a, fullname, email, address, city, country, profilePicture, cloudResponse, updatedData, user, error_7;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                userId = req.id;
                _a = req.body, fullname = _a.fullname, email = _a.email, address = _a.address, city = _a.city, country = _a.country, profilePicture = _a.profilePicture;
                cloudResponse = void 0;
                return [4 /*yield*/, cloudinary_1.default.uploader.upload(profilePicture)];
            case 1:
                cloudResponse = _b.sent();
                updatedData = { fullname: fullname, email: email, address: address, city: city, country: country, profilePicture: profilePicture };
                return [4 /*yield*/, user_model_1.User.findByIdAndUpdate(userId, updatedData, { new: true }).select("-password")];
            case 2:
                user = _b.sent();
                return [2 /*return*/, res.status(200).json({
                        success: true,
                        user: user,
                        message: "Profile updated successfully"
                    })];
            case 3:
                error_7 = _b.sent();
                console.error(error_7);
                return [2 /*return*/, res.status(500).json({ message: "Internal server error" })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateProfile = updateProfile;
