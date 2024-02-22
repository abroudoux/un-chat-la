"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
const config = {
    mongoURI: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpire: process.env.JWT_EXPIRES,
};
if (!config.mongoURI) {
    throw new Error('MONGO_URI is not defined in the environment variables.');
}
;
exports.default = config;
//# sourceMappingURL=keys.js.map