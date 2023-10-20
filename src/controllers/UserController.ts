import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";
import bcrypt from "bcrypt";

export class UserController {
  async createUser(req: Request, res: Response) {
    const { email, name, password, role } = req.body;

    try {
      const userExists = await userRepository.findOneBy({ email });
      if (userExists) {
        return res.status(400).json({ mensagem: "Email já cadastrado." });
      }
    } catch (error) {
      return res.status(400).json({ mensagem: "Erro ao verificar o email" });
    }

    try {
      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = userRepository.create({
        name,
        email,
        password: hashPassword,
        role,
      });

      await userRepository.save(newUser);
      const { password: _, ...user } = newUser;
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ mensagem: "Erro ao salvar novo usuário." });
    }
  }

  async getUsers(req: Request, res: Response) {
    const users = await userRepository.find();
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
    return res.status(201).json(users);
  }
}
