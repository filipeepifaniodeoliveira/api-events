"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const userRepository_1 = require("../repositories/userRepository");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserController {
    async createUser(req, res) {
        const { email, name, password, role } = req.body;
        try {
            const userExists = await userRepository_1.userRepository.findOneBy({ email });
            if (userExists) {
                return res.status(400).json({ mensagem: "Email já cadastrado." });
            }
        }
        catch (error) {
            return res.status(400).json({ mensagem: "Erro ao verificar o email" });
        }
        try {
            const hashPassword = await bcrypt_1.default.hash(password, 10);
            const newUser = userRepository_1.userRepository.create({
                name,
                email,
                password: hashPassword,
                role,
            });
            await userRepository_1.userRepository.save(newUser);
            const { password: _, ...user } = newUser;
            return res.status(201).json(user);
        }
        catch (error) {
            return res.status(400).json({ mensagem: "Erro ao salvar novo usuário." });
        }
    }
    async getUsers(req, res) {
        const users = await userRepository_1.userRepository.find();
        if (req.user.role !== "1") {
            return res.status(401).json({
                mensagem: "Você Não tem permissão para realizan esta operação!",
            });
        }
        if (!users) {
            return res
                .status(400)
                .json({ mensagem: "Não encontramos usuários cadastrados!" });
        }
        const newArr = users.map((event) => {
            const { password: _, ...user } = event;
            return {
                ...event,
                user,
            };
        });
        return res.status(201).json(newArr);
    }
}
exports.UserController = UserController;
