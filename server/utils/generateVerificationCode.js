"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateVerificationCode = void 0;
var generateVerificationCode = function (length) {
    if (length === void 0) { length = 6; }
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var verificationCode = ''; // 6 digit ka code isi me store hoga
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        verificationCode += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return verificationCode;
};
exports.generateVerificationCode = generateVerificationCode;
