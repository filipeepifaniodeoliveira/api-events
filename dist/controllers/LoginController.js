"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
const userRepository_1 = require("../repositories/userRepository");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class LoginController {
    async login(req, res) {
        var _a;
        const { email, password } = req.body;
        const user = await userRepository_1.userRepository.findOneBy({ email });
        if (!user) {
            return res.status(400).json({ mensagem: "E-mail ou senha inválidos" });
        }
        const verifyPass = await bcrypt_1.default.compare(password, user.password);
        if (!verifyPass) {
            return res.status(400).json({ mensagem: "E-mail ou senha inválidos" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, (_a = process.env.JWT_PASS) !== null && _a !== void 0 ? _a : "", {
            expiresIn: "8h",
        });
        const { password: _, ...userLogin } = user;
        return res.json({
            user: userLogin,
            token: token,
        });
    }
}
exports.LoginController = LoginController;
